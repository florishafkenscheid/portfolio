import { NextResponse } from "next/server";
import { listProjects } from "@/server/repositories/projects";
import { ensureSeeded } from "@/server/seed";
import type { ApiError, ProjectListResponse } from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    ensureSeeded();
    const projects = listProjects();
    const body: ProjectListResponse = { projects };
    return NextResponse.json(body);
  } catch (err) {
    console.error(err);
    const body: ApiError = { ok: false, error: "Internal error." };
    return NextResponse.json(body, { status: 500 });
  }
}
