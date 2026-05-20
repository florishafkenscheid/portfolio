import "server-only";
import { createHash } from "node:crypto";
import { db } from "@/server/db";
import type { ContactMessageInput } from "@/types/api";

const IP_SALT = process.env.IP_HASH_SALT ?? "portfolio-default-salt";

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  return createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex");
}

export function insertContactMessage(
  input: ContactMessageInput,
  meta: { userAgent?: string | null; ipHash?: string | null },
): string {
  const result = db()
    .prepare(
      `INSERT INTO contact_messages (name, email, message, user_agent, ip_hash)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(
      input.name.trim(),
      input.email.trim().toLowerCase(),
      input.message.trim(),
      meta.userAgent ?? null,
      meta.ipHash ?? null,
    );
  return String(result.lastInsertRowid);
}

/**
 * Returns the number of contact submissions seen from `ipHash` in the last
 * `windowSeconds`. Used for soft rate-limiting on the contact endpoint.
 */
export function countRecentMessagesByIp(
  ipHash: string,
  windowSeconds: number,
): number {
  const row = db()
    .prepare(
      `SELECT COUNT(*) AS c FROM contact_messages
       WHERE ip_hash = ?
         AND created_at >= datetime('now', ?)`,
    )
    .get(ipHash, `-${windowSeconds} seconds`) as { c: number };
  return row.c;
}
