import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { pageMetadata } from "@/lib/metadata";
import { getProjectBySlug, listProjects } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  ensureSeeded();
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} · Floris Hafkenscheid`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

const NARRATIVE_BLOCKS = [
  { key: "what", label: "01 · What", title: "What it is" },
  { key: "why", label: "02 · Why", title: "Why it exists" },
  { key: "how", label: "03 · How", title: "How it works" },
] as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  ensureSeeded();
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allSorted = listProjects();
  const idx = allSorted.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? allSorted[idx - 1] : null;
  const next = idx < allSorted.length - 1 ? allSorted[idx + 1] : null;

  return (
    <article className="relative mx-auto max-w-[1400px] px-6 md:px-10">
      {/* Back row */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)] hover:text-[color:var(--ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to projects
      </Link>

      {/* Header — editorial */}
      <header className="mt-10 grid gap-10 border-b border-[color:var(--hairline)] pb-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            §{String(project.order).padStart(2, "0")} · {project.status.replace("-", " ")} ·{" "}
            {project.year}
          </p>
          <h1
            className="mt-4 text-display text-[clamp(3rem,10vw,8rem)] leading-[0.88] text-[color:var(--ink)]"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg text-[color:var(--ink-muted)] md:text-xl">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-3 md:flex-col md:items-end">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)] px-4 py-2 text-sm hover:bg-[color:var(--surface)]"
            >
              <GithubIcon className="h-4 w-4" />
              View source
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm text-[color:var(--bg)]"
            >
              Live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.image && (
        <figure className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)]">
          <Image
            src={project.image}
            alt={`Code excerpt from ${project.title}`}
            width={0}
            height={0}
            sizes="(min-width: 1400px) 1320px, 100vw"
            preload
            className="h-auto w-full"
          />
        </figure>
      )}

      {/* Metadata strip */}
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--hairline)] md:grid-cols-4">
        <div className="bg-[color:var(--bg-elevated)] px-5 py-5">
          <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            Year
          </dt>
          <dd className="mt-2 text-display text-2xl text-[color:var(--ink)]">
            {project.year}
          </dd>
        </div>
        <div className="bg-[color:var(--bg-elevated)] px-5 py-5">
          <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            Status
          </dt>
          <dd className="mt-2 text-display text-2xl text-[color:var(--ink)]">
            {project.status.replace("-", " ")}
          </dd>
        </div>
        <div className="bg-[color:var(--bg-elevated)] px-5 py-5">
          <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            Stack
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-[color:var(--ink)]">
            {project.tags.join(" · ")}
          </dd>
        </div>
        <div className="bg-[color:var(--bg-elevated)] px-5 py-5">
          <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
            Index
          </dt>
          <dd className="mt-2 text-display text-2xl text-[color:var(--ink)]">
            №{String(project.order).padStart(2, "0")}
          </dd>
        </div>
      </dl>

      {/* Narrative trio — the heart of the page */}
      <section className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-x-10">
        {NARRATIVE_BLOCKS.map((block, i) => (
          <div
            key={block.key}
            className="md:col-span-12 md:grid md:grid-cols-12 md:gap-x-10"
          >
            <div className="md:col-span-3">
              <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                {block.label}
              </p>
              <h2 className="mt-2 text-display text-3xl">{block.title}</h2>
            </div>
            <NarrativeBody
              text={project.narrative[block.key]}
              dropCap={i === 0}
            />
          </div>
        ))}
      </section>

      {/* Prev / next navigation */}
      <nav className="mt-32 grid gap-6 border-t border-[color:var(--hairline)] pt-10 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)] p-5 hover:bg-[color:var(--surface)]"
          >
            <ArrowLeft className="h-4 w-4 text-[color:var(--ink-muted)]" />
            <div className="flex flex-1 flex-col">
              <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                Previous
              </span>
              <span className="text-display text-xl">{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)] p-5 hover:bg-[color:var(--surface)] md:text-right"
          >
            <div className="flex flex-1 flex-col md:items-end">
              <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                Next
              </span>
              <span className="text-display text-xl">{next.title}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)]" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}

type NarrativeSegment =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] };

/** Splits a narrative into paragraphs and `> `-prefixed list runs. */
function parseNarrative(text: string): NarrativeSegment[] {
  const segments: NarrativeSegment[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const last = segments.at(-1);
    if (trimmed.startsWith(">")) {
      const item = trimmed.replace(/^>\s*/, "");
      if (last?.kind === "list") last.items.push(item);
      else segments.push({ kind: "list", items: [item] });
    } else {
      segments.push({ kind: "text", text: trimmed });
    }
  }
  return segments;
}

function NarrativeBody({ text, dropCap }: { text: string; dropCap: boolean }) {
  const segments = parseNarrative(text);
  return (
    <div className="mt-4 flex max-w-[62ch] flex-col gap-6 md:col-span-9 md:mt-0">
      {segments.map((segment, i) =>
        segment.kind === "text" ? (
          <p
            key={i}
            className="text-lg leading-relaxed text-[color:var(--ink-muted)] md:text-xl"
          >
            {dropCap && i === 0 ? (
              <>
                <span
                  className="float-left mr-3 text-display text-[5rem] leading-[0.85] text-[color:var(--accent)]"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {segment.text.charAt(0)}
                </span>
                {segment.text.slice(1)}
              </>
            ) : (
              segment.text
            )}
          </p>
        ) : (
          <ul
            key={i}
            className="divide-y divide-[color:var(--hairline)] border-y border-[color:var(--hairline)]"
          >
            {segment.items.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.75rem_1fr] items-baseline gap-2 py-4"
              >
                <span
                  aria-hidden
                  className="text-mono text-sm text-[color:var(--accent)]"
                >
                  &gt;
                </span>
                <span className="text-base leading-relaxed text-[color:var(--ink)] md:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
