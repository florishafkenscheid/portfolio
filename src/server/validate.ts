import "server-only";
import type { ContactMessageInput } from "@/types/api";

export type ValidationErrors = Partial<
  Record<keyof ContactMessageInput, string>
>;

export type ContactValidation =
  | { ok: true; value: ContactMessageInput }
  | { ok: false; errors: ValidationErrors };

export function validateContact(raw: unknown): ContactValidation {
  const errors: ValidationErrors = {};
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, errors: { name: "Invalid payload." } };
  }
  const r = raw as Record<string, unknown>;
  const name = typeof r.name === "string" ? r.name.trim() : "";
  const email = typeof r.email === "string" ? r.email.trim() : "";
  const message = typeof r.message === "string" ? r.message.trim() : "";

  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 100) errors.name = "That name is too long.";
  if (!/.+@.+\..+/.test(email)) errors.email = "That email doesn't look right.";
  if (email.length > 254) errors.email = "That email is too long.";
  if (message.length < 10) errors.message = "A few more words, please.";
  if (message.length > 5000) errors.message = "That message is too long.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, email, message } };
}
