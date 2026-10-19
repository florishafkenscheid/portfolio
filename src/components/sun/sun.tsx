"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type SunProps = {
  /** Vertical position as a 0..1 fraction of the viewport from top. */
  y?: number;
  /** Visual size in viewport-width units. */
  size?: number;
  /** Max drift in px when the cursor is at the viewport edge. */
  drift?: number;
};

/**
 * Eases the sun towards an offset that follows the cursor. Writes a
 * translate3d onto one composited layer, so a frame costs no layout or paint.
 * The rAF loop only runs while the sun is still moving.
 */
function useCursorDrift(ref: React.RefObject<HTMLDivElement | null>, drift: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * drift;
      targetY = ((e.clientY - cy) / cy) * drift;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref, drift]);
}

/**
 * The portfolio's signature element. A multi-layered radial sun that:
 *   - sits behind the content frame and bleeds off the page
 *   - rotates a corona ring at a glacial pace
 *   - pulses a soft halo
 *   - drifts slightly towards the cursor
 *
 * Colors are driven by CSS variables (--sun-core / --sun-mid / --sun-edge / --sun-glow)
 * so the theme toggle changes its hue without re-rendering.
 *
 * Performance: the looping animations are CSS (`animate-halo`, `animate-corona`)
 * and only touch opacity and transform, so the compositor runs them without
 * main-thread work or repainting. Avoid `filter: blur()` and animated `scale`
 * here: on a disc this size they force a full repaint every frame.
 */
export function Sun({ y = 0.62, size = 78, drift = 16 }: SunProps) {
  const driftRef = useRef<HTMLDivElement>(null);
  useCursorDrift(driftRef, drift);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Soft full-bleed radial wash — sets the page atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% ${y * 100}%, var(--sun-glow), transparent 60%)`,
        }}
      />

      {/* Drift layer: carries the cursor offset, separate from Motion's intro transform */}
      <div ref={driftRef} className="absolute inset-0 will-change-transform">
        {/* The sun disc itself */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${y * 100}%`,
            width: `${size}vw`,
            height: `${size}vw`,
            maxWidth: "1200px",
            maxHeight: "1200px",
          }}
        >
          {/* Outer halo — slow pulse. A wide gradient stands in for a blur filter. */}
          <div
            className="absolute -inset-[8%] rounded-full opacity-[0.55] motion-safe:animate-halo"
            style={{
              background: `radial-gradient(circle at 50% 50%, var(--sun-mid) 0%, color-mix(in oklab, var(--sun-mid) 45%, transparent) 38%, transparent 70%)`,
            }}
          />

          {/* Core disc — crisp edge */}
          <div
            className="absolute inset-[18%] rounded-full"
            style={{
              background: `radial-gradient(circle at 38% 35%, var(--sun-core), var(--sun-mid) 55%, var(--sun-edge) 100%)`,
              boxShadow: "0 0 120px 20px var(--sun-glow)",
            }}
          />

          {/* Corona ring — slow rotation */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 will-change-transform motion-safe:animate-corona"
          >
            <defs>
              <radialGradient id="coronaFade" cx="50%" cy="50%" r="50%">
                <stop offset="55%" stopColor="transparent" />
                <stop offset="75%" stopColor="var(--sun-edge)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Tick marks around the corona — gives it a celestial-instrument feel */}
            {Array.from({ length: 60 }).map((_, i) => {
              // Rounded below: server and browser trig differ in the last digits,
              // which would otherwise cause a hydration mismatch.
              const angle = (i / 60) * Math.PI * 2;
              const r1 = 80;
              const r2 = i % 5 === 0 ? 92 : 86;
              const x1 = 100 + Math.cos(angle) * r1;
              const y1 = 100 + Math.sin(angle) * r1;
              const x2 = 100 + Math.cos(angle) * r2;
              const y2 = 100 + Math.sin(angle) * r2;
              return (
                <line
                  key={i}
                  x1={x1.toFixed(3)}
                  y1={y1.toFixed(3)}
                  x2={x2.toFixed(3)}
                  y2={y2.toFixed(3)}
                  stroke="var(--sun-edge)"
                  strokeWidth={i % 5 === 0 ? 0.6 : 0.3}
                  opacity={i % 5 === 0 ? 0.7 : 0.4}
                />
              );
            })}
            <circle cx="100" cy="100" r="94" fill="url(#coronaFade)" />
          </svg>
        </motion.div>
      </div>

      {/* Horizon line — sits the sun on something */}
      <div
        className="absolute inset-x-0 h-px"
        style={{
          top: `${y * 100}%`,
          background:
            "linear-gradient(90deg, transparent, var(--hairline) 20%, var(--hairline) 80%, transparent)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
