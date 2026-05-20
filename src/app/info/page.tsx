import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Info — Floris Hafkenscheid",
};

const FACTS: Array<{ label: string; value: string }> = [
  { label: "Based in", value: "Netherlands" },
  { label: "Graduated", value: "2026" },
  { label: "Working with", value: "Rust · Java · C#" },
  { label: "Curious about", value: "Compilers · ML systems · Game engines" },
  { label: "Off-screen", value: "Volleyball · Golf · Motorsports" },
  { label: "Open to", value: "Internships · Collaborations · Coffee" },
];

const TIMELINE = [
  {
    year: "2026",
    title: "Graduated",
    detail:
      "Finished my degree and started looking for somewhere to do the work professionally — systems, AI, the parts of software that don't pretend to be magic.",
  },
  {
    year: "2025",
    title: "First internship",
    detail:
      "Shipped backend services in a small team. Learned how much of engineering is reading other people's code patiently.",
  },
  {
    year: "2024",
    title: "First serious projects",
    detail:
      "BELT and Sharpfish became the main projects; WorldManager and PluginHider kept the server-tool thread going.",
  },
  {
    year: "2023",
    title: "Started writing tools instead of just using them",
    detail:
      "Began publishing plugins and small utilities to GitHub. The first time other people used my code was a quiet but significant event.",
  },
];

export default function InfoPage() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 md:px-10">
      <header className="border-b border-[color:var(--hairline)] pb-10">
        <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
          §03 · About
        </p>
        <h1 className="mt-3 text-display text-5xl md:text-7xl">Hello — I&apos;m Floris.</h1>
      </header>

      {/* Bio — editorial 12-col with dropcap */}
      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <aside className="md:col-span-4">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--hairline)]">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7rem_1fr] items-baseline gap-3 bg-[color:var(--bg-elevated)] px-4 py-3"
              >
                <dt className="text-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--ink-subtle)]">
                  {fact.label}
                </dt>
                <dd className="text-sm text-[color:var(--ink)]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="md:col-span-8">
          <p className="max-w-[60ch] text-lg leading-relaxed text-[color:var(--ink-muted)] md:text-xl">
            <span
              className="float-left mr-3 text-display text-[5rem] leading-[0.85] text-[color:var(--accent)]"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              I
            </span>
            build software the way some people fix old motorcycles — slowly,
            in pieces, with a strong preference for understanding every part
            before reassembling it. Most of what&apos;s on this site started
            because something I was already using didn&apos;t quite fit, or
            because I wanted to know how a thing worked all the way down.
          </p>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[color:var(--ink-muted)] md:text-xl">
            I graduated in 2026 and I&apos;m looking for a place to do that
            same work professionally — somewhere that values careful builds
            over shipping noise, where I can keep learning from people who
            care about their craft. AI and data systems are where I&apos;m
            pointing next.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--bg)] transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <section className="mt-32">
        <div className="border-b border-[color:var(--hairline)] pb-6">
          <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            Timeline
          </p>
          <h2 className="mt-2 text-display text-4xl md:text-5xl">A short history.</h2>
        </div>

        <ol className="mt-2 divide-y divide-[color:var(--hairline)]">
          {TIMELINE.map((entry) => (
            <li
              key={entry.year}
              className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[8rem_1fr] md:gap-12"
            >
              <span className="text-mono text-sm uppercase tracking-[0.16em] text-[color:var(--ink-subtle)]">
                {entry.year}
              </span>
              <div className="max-w-[60ch]">
                <h3 className="text-display text-2xl text-[color:var(--ink)]">
                  {entry.title}
                </h3>
                <p className="mt-2 text-base text-[color:var(--ink-muted)]">
                  {entry.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
