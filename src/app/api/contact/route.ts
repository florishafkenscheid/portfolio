import { NextResponse } from "next/server";
import {
  countRecentMessagesByIp,
  hashIp,
  insertContactMessage,
} from "@/server/repositories/contact";
import { validateContact } from "@/server/validate";
import type { ApiError, ContactMessageResponse } from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_SECONDS = 60 * 60; // 1 hour
const RATE_MAX_PER_WINDOW = 5;
const DISCORD_WEBHOOK_URL =
  process.env.CONTACT_DISCORD_WEBHOOK_URL ?? process.env.DISCORD_WEBHOOK_URL;

function getClientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip");
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

async function sendDiscordNotification(input: {
  id: string;
  name: string;
  email: string;
  message: string;
  userAgent: string | null;
}) {
  if (!DISCORD_WEBHOOK_URL) return;

  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Portfolio contact",
      embeds: [
        {
          title: "New portfolio message",
          color: 0x5eead4,
          description: truncate(input.message.trim(), 4000),
          fields: [
            {
              name: "Name",
              value: truncate(input.name.trim(), 1024),
              inline: true,
            },
            {
              name: "Email",
              value: truncate(input.email.trim().toLowerCase(), 1024),
              inline: true,
            },
            {
              name: "Message ID",
              value: input.id,
              inline: true,
            },
            ...(input.userAgent
              ? [
                  {
                    name: "User agent",
                    value: truncate(input.userAgent, 1024),
                    inline: false,
                  },
                ]
              : []),
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Discord webhook failed with ${res.status}`);
  }
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    const body: ApiError = { ok: false, error: "Invalid JSON." };
    return NextResponse.json(body, { status: 400 });
  }

  const v = validateContact(raw);
  if (!v.ok) {
    const body: ApiError = {
      ok: false,
      error: "Please correct the highlighted fields.",
      details: v.errors as Record<string, string>,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const ipHash = hashIp(getClientIp(req));
  if (ipHash) {
    const recent = countRecentMessagesByIp(ipHash, RATE_WINDOW_SECONDS);
    if (recent >= RATE_MAX_PER_WINDOW) {
      const body: ApiError = {
        ok: false,
        error: "Too many messages from this address — please try again later.",
      };
      return NextResponse.json(body, { status: 429 });
    }
  }

  try {
    const userAgent = req.headers.get("user-agent");
    const id = insertContactMessage(v.value, {
      userAgent,
      ipHash,
    });
    await sendDiscordNotification({ id, ...v.value, userAgent });
    const body: ContactMessageResponse = { ok: true, id };
    return NextResponse.json(body, { status: 201 });
  } catch (err) {
    const body: ApiError = {
      ok: false,
      error: err instanceof Error ? err.message : "Internal error",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
