"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const SOCIALS = [
  {
    href: "https://github.com/florishafkenscheid",
    label: "GitHub",
    handle: "florishafkenscheid",
  },
  {
    href: "https://www.linkedin.com/in/florishafkenscheid/",
    label: "LinkedIn",
    handle: "/in/florishafkenscheid",
  },
  {
    href: "mailto:floris@hafkenscheid.com",
    label: "Email",
    handle: "floris@hafkenscheid.com",
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

function reveal(i: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 * i, ease: EASE },
  };
}

export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-[1400px] flex-col px-6 md:px-10">
      {/* Top meta — status */}
      <motion.div
        {...reveal(0)}
        className="flex flex-wrap items-center gap-4 text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_var(--ring)]" />
          <span>Graduated 2026 · Open to internships</span>
        </div>
      </motion.div>

      {/* Display name */}
      <div className="mt-12 md:mt-16">
        <motion.h1
          {...reveal(1)}
          className="text-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.86] text-[color:var(--ink)]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 0' }}
        >
          Floris
          <span className="block">
            Hafkensc
            <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
              h
            </span>
            eid
          </span>
        </motion.h1>

        <motion.p
          {...reveal(2)}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-[color:var(--ink-muted)] md:text-xl"
        >
          Computer-science graduate building deliberate software —
          <span className="text-[color:var(--ink)]"> game tools, plugins, and engines </span>
          that exist because the obvious solution didn&apos;t quite fit.
        </motion.p>
      </div>

      {/* Action row */}
      <motion.div
        {...reveal(3)}
        className="mt-12 flex flex-wrap items-center gap-3 md:mt-16"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--bg)] transition-transform hover:-translate-y-0.5"
        >
          <span>See the work</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          href="/info"
          className="inline-flex items-center gap-3 rounded-full border border-[color:var(--hairline)] px-5 py-3 text-sm text-[color:var(--ink)] hover:bg-[color:var(--bg-elevated)]"
        >
          About me
        </Link>
      </motion.div>

      {/* Socials list — editorial table */}
      <motion.dl
        {...reveal(4)}
        className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--hairline)] md:mt-32 md:grid-cols-3"
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex items-center justify-between gap-4 bg-[color:var(--bg)] px-5 py-5 transition-colors hover:bg-[color:var(--bg-elevated)]"
          >
            <div className="flex flex-col">
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                {s.label}
              </dt>
              <dd className="mt-1 text-base text-[color:var(--ink)]">{s.handle}</dd>
            </div>
            <ArrowUpRight className="h-4 w-4 -translate-y-0 text-[color:var(--ink-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--accent)]" />
          </a>
        ))}
      </motion.dl>
    </section>
  );
}
