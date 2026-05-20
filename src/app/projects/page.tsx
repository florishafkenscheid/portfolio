import type { Metadata } from "next";
import { ProjectIndex } from "@/components/projects/project-index";
import { listProjects } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";

export const metadata: Metadata = {
  title: "Projects — Floris Hafkenscheid",
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  ensureSeeded();
  return <ProjectIndex projects={listProjects()} />;
}
