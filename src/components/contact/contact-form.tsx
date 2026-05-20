"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { api, ApiCallError } from "@/lib/api";

type FieldErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

function validateLocal(input: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/.+@.+\..+/.test(input.email)) errors.email = "That email doesn't look right.";
  if (input.message.trim().length < 10) errors.message = "A few more words, please.";
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const local = validateLocal(form);
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await api.sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const msg =
        err instanceof ApiCallError
          ? err.payload.error
          : "Couldn't send — try again in a moment.";
      setErrors({ form: msg });
      setStatus("idle");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-start gap-4 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)] p-8"
          >
            <CheckCircle2 className="h-8 w-8 text-[color:var(--accent)]" />
            <h3 className="text-display text-3xl">Sent.</h3>
            <p className="max-w-prose text-[color:var(--ink-muted)]">
              Thanks for reaching out — I&apos;ll get back to you within a couple of days.
              If it&apos;s urgent, email me directly at{" "}
              <a
                href="mailto:floris@hafkenscheid.com"
                className="text-[color:var(--accent)] underline-offset-4 hover:underline"
              >
                floris@hafkenscheid.com
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm text-[color:var(--ink-muted)] underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5"
          >
            <Field
              id="name"
              label="Name"
              value={form.name}
              error={errors.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              autoComplete="name"
              placeholder="Ada Lovelace"
            />
            <Field
              id="email"
              type="email"
              label="Email"
              value={form.email}
              error={errors.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              autoComplete="email"
              placeholder="ada@analytical.engine"
            />
            <Field
              id="message"
              as="textarea"
              label="Message"
              value={form.message}
              error={errors.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              placeholder="I'd love to talk about…"
            />

            {errors.form && (
              <p className="text-sm text-red-400">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group mt-2 inline-flex items-center justify-center gap-3 self-start rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-medium text-[color:var(--bg)] transition-transform hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-60"
            >
              <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  as?: "input" | "textarea";
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const baseClass =
    "w-full resize-none border-b border-[color:var(--hairline)] bg-transparent px-0 py-3 text-lg text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)] placeholder:text-[color:var(--ink-subtle)]";

  return (
    <div className="grid gap-1">
      <label
        htmlFor={id}
        className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={baseClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="text-mono text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
