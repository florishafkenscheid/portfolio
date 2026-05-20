"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/api";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 2);

  return (
    <section className="relative mx-auto mt-40 max-w-[1400px] px-6 md:px-10">
      <div className="flex items-end justify-between gap-6 border-b border-[color:var(--hairline)] pb-6">
        <div>
          <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            §02 · Selected work
          </p>
          <h2 className="mt-3 text-display text-4xl md:text-5xl">
            A few recent builds.
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden shrink-0 items-center gap-2 text-sm text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] md:inline-flex"
        >
          All projects
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-4 divide-y divide-[color:var(--hairline)]">
        {featured.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 md:gap-10 md:py-10"
            >
              <span className="text-mono text-xs text-[color:var(--ink-subtle)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-2">
                <span className="text-display text-3xl text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)] md:text-5xl">
                  {project.title}
                </span>
                <span className="max-w-2xl text-sm text-[color:var(--ink-muted)] md:text-base">
                  {project.summary}
                </span>
                <span className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>

              <span className="text-mono text-xs uppercase tracking-[0.16em] text-[color:var(--ink-subtle)]">
                <span className="hidden md:inline">{project.year} · </span>
                <span className="text-[color:var(--ink-muted)]">
                  {project.status.replace("-", " ")}
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link
        href="/projects"
        className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] md:hidden"
      >
        All projects
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
