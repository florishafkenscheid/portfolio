import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";
import type { ApiError, ProjectDetailResponse } from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    ensureSeeded();
    const { slug } = await context.params;
    const project = getProjectBySlug(slug);
    if (!project) {
      const body: ApiError = { ok: false, error: "Project not found." };
      return NextResponse.json(body, { status: 404 });
    }
    const body: ProjectDetailResponse = { project };
    return NextResponse.json(body);
  } catch (err) {
    const body: ApiError = {
      ok: false,
      error: err instanceof Error ? err.message : "Internal error",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
