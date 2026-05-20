<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Notes

This is a Next.js app with local SQLite-backed route handlers. Treat
[`src/types/api.ts`](src/types/api.ts) as the source of truth for response shapes.

## Endpoints

| Method | Path                    | Body / Query              | Response                  |
| ------ | ----------------------- | ------------------------- | ------------------------- |
| GET    | `/api/projects`         | —                         | `ProjectListResponse`     |
| GET    | `/api/projects/:slug`   | —                         | `ProjectDetailResponse`   |
| POST   | `/api/contact`          | `ContactMessageInput`     | `ContactMessageResponse`  |

On error, return HTTP 4xx/5xx with body matching `ApiError`:
```json
{ "ok": false, "error": "human-readable message", "details": { "field": "why" } }
```

## Data model

A `Project` is the central entity. The route handlers return camelCase fields and
the repository maps from SQLite snake_case columns at the boundary:

```ts
type Project = {
  slug: string;          // URL-safe, unique. Frontend routes use this.
  title: string;
  summary: string;       // one sentence, used in lists + cards
  image: string | null;  // null until real screenshots are added
  githubUrl: string | null;
  liveUrl?: string | null;
  year: number;
  status: "shipped" | "in-progress" | "archived" | "exploration";
  tags: string[];
  narrative: { what: string; why: string; how: string };
  order: number;         // ascending — controls list ordering
};
```

`ContactMessageInput` validation should mirror the frontend's local rules
(`src/components/contact/contact-form.tsx`): name ≥ 2 chars, email matches
`/.+@.+\..+/`, message ≥ 10 chars. Return per-field `details` on 400.

## Local Data

Canonical project data lives in [`src/lib/project-data.ts`](src/lib/project-data.ts)
and is seeded into `data/portfolio.db` on first request. Set `FORCE_RESEED=1` or
delete the ignored `data/` directory to rebuild local data from the canonical list.

Contact submissions are stored in SQLite. Set `CONTACT_DISCORD_WEBHOOK_URL` to
also send each submission as a Discord embed.
