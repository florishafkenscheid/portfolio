import "server-only";
import { countProjects, upsertProject } from "@/server/repositories/projects";
import { PROJECTS } from "@/lib/project-data";

let seeded = false;

/**
 * Idempotent first-run seed. Inserts the canonical project list if the table
 * is empty. Safe to call on every request — runs at most once per process.
 *
 * To force a re-seed: delete `data/portfolio.db` or set FORCE_RESEED=1.
 */
export function ensureSeeded(): void {
  if (seeded) return;
  if (process.env.FORCE_RESEED === "1" || countProjects() === 0) {
    for (const p of PROJECTS) {
      upsertProject({
        ...p,
        image: null, // placeholders dropped — real screenshots can be added later
      });
    }
  }
  seeded = true;
}
