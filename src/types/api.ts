/**
 * API contract between the Next.js frontend and the Codex-built backend.
 * Treat this file as authoritative — the backend MUST return these exact shapes.
 */

export type ProjectStatus = "shipped" | "in-progress" | "archived" | "exploration";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  githubUrl: string | null;
  liveUrl?: string | null;
  year: number;
  status: ProjectStatus;
  tags: string[];
  narrative: {
    what: string;
    why: string;
    how: string;
  };
  order: number;
};

export type ProjectListResponse = {
  projects: Project[];
};

export type ProjectDetailResponse = {
  project: Project;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactMessageResponse = {
  ok: true;
  id: string;
};

export type ApiError = {
  ok: false;
  error: string;
  details?: Record<string, string>;
};

export const API_ROUTES = {
  projects: "/api/projects",
  project: (slug: string) => `/api/projects/${encodeURIComponent(slug)}`,
  contact: "/api/contact",
} as const;
