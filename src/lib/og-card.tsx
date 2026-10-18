import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// Dark-theme tokens from globals.css, converted from oklch (Satori can't parse it).
const C = {
  bg: "#070416",
  hairline: "#332d4f",
  ink: "#f3eeff",
  muted: "#b9b3cf",
  subtle: "#7c7690",
  accent: "#a053fd",
  sunCore: "#d296ff",
  sunMid: "#8b3ae5",
  sunEdge: "#41008a",
};

const PAD = 72;

const fontDir = path.join(process.cwd(), "src/assets/fonts");
let fonts: Promise<{ name: string; data: Buffer }[]> | undefined;
function loadFonts() {
  fonts ??= Promise.all(
    [
      ["Fraunces", "Fraunces-Display.ttf"],
      ["Geist", "Geist-Regular.ttf"],
      ["JetBrains Mono", "JetBrainsMono-Regular.ttf"],
    ].map(async ([name, file]) => ({
      name,
      data: await readFile(path.join(fontDir, file)),
    })),
  );
  return fonts;
}

/** Shrinks long titles so they stay on one line inside the padding. */
function titleSize(title: string) {
  return Math.min(152, Math.floor((OG_SIZE.width - PAD * 2) / (title.length * 0.5)));
}

// Corona ticks around the sun, mirroring the site's Sun component.
function ticks(cx: number, cy: number) {
  return Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const major = i % 5 === 0;
    const r1 = 300;
    const r2 = major ? 345 : 322;
    return (
      <line
        key={i}
        x1={(cx + Math.cos(a) * r1).toFixed(1)}
        y1={(cy + Math.sin(a) * r1).toFixed(1)}
        x2={(cx + Math.cos(a) * r2).toFixed(1)}
        y2={(cy + Math.sin(a) * r2).toFixed(1)}
        stroke={C.accent}
        strokeWidth={major ? 2 : 1}
        strokeOpacity={major ? 0.55 : 0.3}
      />
    );
  });
}

export async function renderOgCard({
  eyebrow,
  meta,
  title,
  summary,
  tags = [],
}: {
  /** Top-left label, e.g. "Projects". */
  eyebrow: string;
  /** Top-right label, e.g. "№03 · archived · 2024". */
  meta?: string;
  title: string;
  summary: string;
  tags?: string[];
}) {
  const sun = { x: 1080, y: 640 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.bg,
          color: C.ink,
          fontFamily: "Geist",
        }}
      >
        {/* Atmosphere + sun, bleeding off the bottom-right like the site */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: `radial-gradient(ellipse 70% 80% at ${sun.x}px ${sun.y}px, ${C.sunMid}55, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: sun.x - 260,
            top: sun.y - 260,
            width: 520,
            height: 520,
            borderRadius: 9999,
            display: "flex",
            background: `radial-gradient(circle at 40% 35%, ${C.sunCore}, ${C.sunMid} 45%, ${C.sunEdge} 80%)`,
            opacity: 0.9,
          }}
        />
        <svg
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {ticks(sun.x, sun.y)}
        </svg>

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: PAD,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: 22,
              borderBottom: `1px solid ${C.hairline}`,
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: C.subtle,
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ color: C.accent }}>●</span>
              <span>blousy.dev</span>
              <span>/</span>
              <span>{eyebrow}</span>
            </div>
            {meta && <span>{meta}</span>}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 56,
              fontFamily: "Fraunces",
              fontSize: titleSize(title),
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 820,
              fontSize: 32,
              lineHeight: 1.35,
              color: C.muted,
            }}
          >
            {summary}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              color: C.muted,
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "flex",
                    padding: "8px 18px",
                    borderRadius: 9999,
                    border: `1px solid ${C.hairline}`,
                    background: `${C.bg}cc`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: (await loadFonts()).map((f) => ({
        ...f,
        weight: 400 as const,
        style: "normal" as const,
      })),
    },
  );
}
