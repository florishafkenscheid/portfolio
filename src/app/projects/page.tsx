import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ProjectIndex } from "@/components/projects/project-index";
import { listProjects } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";

export const metadata: Metadata = pageMetadata({
  title: "Projects · Floris Hafkenscheid",
  description: "Things I’ve built, with what each one does, why it exists and how it works.",
  path: "/projects",
});

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  ensureSeeded();
  return <ProjectIndex projects={listProjects()} />;
}
