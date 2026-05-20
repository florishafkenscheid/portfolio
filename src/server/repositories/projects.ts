import "server-only";
import { db } from "@/server/db";
import type { Project, ProjectStatus } from "@/types/api";

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  github_url: string | null;
  live_url: string | null;
  year: number;
  status: string;
  tags: string;
  narrative_what: string;
  narrative_why: string;
  narrative_how: string;
  ordinal: number;
};

function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    image: row.image,
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    year: row.year,
    status: row.status as ProjectStatus,
    tags: JSON.parse(row.tags) as string[],
    narrative: {
      what: row.narrative_what,
      why: row.narrative_why,
      how: row.narrative_how,
    },
    order: row.ordinal,
  };
}

export function listProjects(): Project[] {
  const rows = db()
    .prepare(
      `SELECT * FROM projects ORDER BY ordinal ASC, year DESC, title ASC`,
    )
    .all() as ProjectRow[];
  return rows.map(rowToProject);
}

export function getProjectBySlug(slug: string): Project | null {
  const row = db()
    .prepare(`SELECT * FROM projects WHERE slug = ?`)
    .get(slug) as ProjectRow | undefined;
  return row ? rowToProject(row) : null;
}

type ProjectSeed = Omit<Project, "tags"> & { tags: string[] };

export function upsertProject(p: ProjectSeed): void {
  db()
    .prepare(
      `INSERT INTO projects (
         slug, title, summary, image, github_url, live_url,
         year, status, tags,
         narrative_what, narrative_why, narrative_how, ordinal, updated_at
       )
       VALUES (
         @slug, @title, @summary, @image, @github_url, @live_url,
         @year, @status, @tags,
         @narrative_what, @narrative_why, @narrative_how, @ordinal, datetime('now')
       )
       ON CONFLICT(slug) DO UPDATE SET
         title = excluded.title,
         summary = excluded.summary,
         image = excluded.image,
         github_url = excluded.github_url,
         live_url = excluded.live_url,
         year = excluded.year,
         status = excluded.status,
         tags = excluded.tags,
         narrative_what = excluded.narrative_what,
         narrative_why = excluded.narrative_why,
         narrative_how = excluded.narrative_how,
         ordinal = excluded.ordinal,
         updated_at = datetime('now')`,
    )
    .run({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      image: p.image,
      github_url: p.githubUrl,
      live_url: p.liveUrl ?? null,
      year: p.year,
      status: p.status,
      tags: JSON.stringify(p.tags),
      narrative_what: p.narrative.what,
      narrative_why: p.narrative.why,
      narrative_how: p.narrative.how,
      ordinal: p.order,
    });
}

export function countProjects(): number {
  const row = db().prepare(`SELECT COUNT(*) AS c FROM projects`).get() as {
    c: number;
  };
  return row.c;
}
