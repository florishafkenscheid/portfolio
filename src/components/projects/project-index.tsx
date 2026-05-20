"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import type { Project } from "@/types/api";

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-[1400px] px-6 md:px-10">
      {/* Page heading */}
      <header className="border-b border-[color:var(--hairline)] pb-10">
        <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
          Index · {String(projects.length).padStart(2, "0")} entries
        </p>
        <h1 className="mt-3 text-display text-5xl md:text-7xl">Projects.</h1>
        <p className="mt-6 max-w-2xl text-balance text-base text-[color:var(--ink-muted)] md:text-lg">
          A working catalogue of things I&apos;ve built — listed by recency.
          Click an entry to read the full What / Why / How.
        </p>
      </header>

      <ul className="mt-6 divide-y divide-[color:var(--hairline)]">
        {projects.map((project, i) => {
          const isDimmed = hovered !== null && hovered !== project.slug;
          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                onPointerEnter={() => setHovered(project.slug)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(project.slug)}
                onBlur={() => setHovered(null)}
                className={`group grid grid-cols-[3rem_1fr_auto] items-center gap-6 py-8 transition-opacity duration-300 md:grid-cols-[4rem_1fr_8rem_auto] md:gap-10 md:py-10 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <span className="text-mono text-xs text-[color:var(--ink-subtle)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex min-w-0 flex-col gap-1">
                  <span
                    className="text-display text-3xl leading-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)] md:text-5xl"
                    style={{ fontVariationSettings: '"opsz" 144' }}
                  >
                    {project.title}
                  </span>
                  <span className="line-clamp-1 text-sm text-[color:var(--ink-muted)]">
                    {project.summary}
                  </span>
                </div>

                <div className="hidden flex-wrap gap-1.5 md:flex">
                  {project.tags.slice(0, 2).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-3 text-mono text-xs uppercase tracking-[0.16em] text-[color:var(--ink-subtle)]">
                  <span>{project.year}</span>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--ink-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--accent)]" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Below: quick GitHub strip */}
      <div className="mt-20 flex items-center justify-between border-t border-[color:var(--hairline)] pt-6 text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
        <span>End of catalogue</span>
        <a
          href="https://github.com/florishafkenscheid"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-[color:var(--ink)]"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          More on GitHub
        </a>
      </div>
    </section>
  );
}
