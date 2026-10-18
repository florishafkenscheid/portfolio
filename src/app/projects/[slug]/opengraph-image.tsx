import { OG_SIZE, renderOgCard } from "@/lib/og-card";
import { PROJECTS } from "@/lib/project-data";

// Reads the canonical list (what the DB is synced from) so cards can be
// prerendered at build time without touching SQLite.
export const alt = "Project card from blousy.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

// Only the prerendered slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug)!;
  return renderOgCard({
    eyebrow: "Projects",
    meta: `№${String(project.order).padStart(2, "0")} · ${project.status.replace("-", " ")} · ${project.year}`,
    title: project.title,
    summary: project.summary,
    tags: project.tags,
  });
}
