import {
  API_ROUTES,
  type ApiError,
  type ContactMessageInput,
  type ContactMessageResponse,
  type ProjectDetailResponse,
  type ProjectListResponse,
} from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

class ApiCallError extends Error {
  constructor(public readonly payload: ApiError, public readonly status: number) {
    super(payload.error);
    this.name = "ApiCallError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: init?.cache ?? "no-store",
  });
  if (!res.ok) {
    const payload = (await res.json().catch(() => ({
      ok: false,
      error: res.statusText,
    }))) as ApiError;
    throw new ApiCallError(payload, res.status);
  }
  return (await res.json()) as T;
}

export const api = {
  listProjects: () => request<ProjectListResponse>(API_ROUTES.projects),
  getProject: (slug: string) =>
    request<ProjectDetailResponse>(API_ROUTES.project(slug)),
  sendContact: (input: ContactMessageInput) =>
    request<ContactMessageResponse>(API_ROUTES.contact, {
      method: "POST",
      body: JSON.stringify(input),
    }),
};

export { ApiCallError };
