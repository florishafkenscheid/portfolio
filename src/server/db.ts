import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const DB_FILE =
  process.env.DB_FILE ?? path.join(process.cwd(), "data", "portfolio.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS projects (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  summary         TEXT NOT NULL,
  image           TEXT,
  github_url      TEXT,
  live_url        TEXT,
  year            INTEGER NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('shipped','in-progress','archived','exploration')),
  tags            TEXT NOT NULL DEFAULT '[]',
  narrative_what  TEXT NOT NULL,
  narrative_why   TEXT NOT NULL,
  narrative_how   TEXT NOT NULL,
  ordinal         INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_ordinal ON projects(ordinal);

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  user_agent  TEXT,
  ip_hash     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at);
`;

declare global {
  var __portfolioDb: DatabaseSync | undefined;
}

function openDb(): DatabaseSync {
  // Ensure the data directory exists before opening (mkdir -p).
  const dir = path.dirname(DB_FILE);
  mkdirSync(dir, { recursive: true });

  const database = new DatabaseSync(DB_FILE);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec("PRAGMA foreign_keys = ON;");
  database.exec(SCHEMA);
  return database;
}

/**
 * Singleton across HMR — Next's dev server reloads modules, so we stash the
 * handle on globalThis to avoid re-opening (and re-locking) the DB file.
 */
export function db(): DatabaseSync {
  if (!globalThis.__portfolioDb) {
    globalThis.__portfolioDb = openDb();
  }
  return globalThis.__portfolioDb;
}
