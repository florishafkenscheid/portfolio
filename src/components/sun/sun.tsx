"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type SunProps = {
  /** Vertical position as a 0..1 fraction of the viewport from top. */
  y?: number;
  /** Visual size in viewport-width units. */
  size?: number;
  /** Whether to react to pointer movement (subtle parallax). */
  parallax?: boolean;
};

/**
 * The portfolio's signature element. A multi-layered radial sun that:
 *   - sits behind the content frame and bleeds off the page
 *   - rotates a corona ring at a glacial pace
 *   - pulses a soft halo
 *   - drifts very slightly with the cursor (parallax) for the live feel
 *
 * Colors are driven by CSS variables (--sun-core / --sun-mid / --sun-edge / --sun-glow)
 * so the theme toggle changes its hue without re-rendering.
 */
export function Sun({ y = 0.62, size = 78, parallax = true }: SunProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!parallax || reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 14;
      targetY = ((e.clientY - cy) / cy) * 14;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      el.style.setProperty("--sun-dx", `${currentX}px`);
      el.style.setProperty("--sun-dy", `${currentY}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [parallax, reduceMotion]);

  return (
    <div
      ref={ref}
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

      {/* The sun disc itself */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: `${y * 100}%`,
          transform: `translate(calc(-50% + var(--sun-dx, 0px)), calc(-50% + var(--sun-dy, 0px)))`,
          width: `${size}vw`,
          height: `${size}vw`,
          maxWidth: "1200px",
          maxHeight: "1200px",
        }}
      >
        {/* Outer halo — slow pulse */}
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, var(--sun-mid), transparent 65%)`,
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
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
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
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--sun-edge)"
                strokeWidth={i % 5 === 0 ? 0.6 : 0.3}
                opacity={i % 5 === 0 ? 0.7 : 0.4}
              />
            );
          })}
          <circle cx="100" cy="100" r="94" fill="url(#coronaFade)" />
        </motion.svg>
      </motion.div>

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
