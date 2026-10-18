import "server-only";
import { deleteProjectsExcept, upsertProject } from "@/server/repositories/projects";
import { PROJECTS } from "@/lib/project-data";

let seeded = false;

/**
 * Syncs the projects table with the canonical list in `project-data.ts`.
 * Upserts every project and drops rows whose slug is no longer listed, so
 * edits to the canonical list show up after a server restart. Runs at most
 * once per process.
 */
export function ensureSeeded(): void {
  if (seeded) return;
  for (const p of PROJECTS) upsertProject(p);
  deleteProjectsExcept(PROJECTS.map((p) => p.slug));
  seeded = true;
}
