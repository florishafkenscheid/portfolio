import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { listProjects } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";

export const dynamic = "force-dynamic";

export default function HomePage() {
  ensureSeeded();
  const projects = listProjects();

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
    </>
  );
}
