import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact — Floris Hafkenscheid",
};

export default function ContactPage() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 md:px-10">
      <header className="border-b border-[color:var(--hairline)] pb-10">
        <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
          §04 · Contact
        </p>
        <h1 className="mt-3 text-display text-5xl md:text-7xl">Say hello.</h1>
        <p className="mt-6 max-w-2xl text-balance text-base text-[color:var(--ink-muted)] md:text-lg">
          Internship, collaboration, or just a question — I read everything that
          lands in the inbox.
        </p>
      </header>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <aside className="md:col-span-4">
          <dl className="grid gap-6 text-sm">
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href="mailto:floris@hafkenscheid.com"
                  className="text-[color:var(--ink)] hover:text-[color:var(--accent)]"
                >
                  floris@hafkenscheid.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                Elsewhere
              </dt>
              <dd className="mt-1 flex flex-col gap-1">
                <a
                  href="https://github.com/florishafkenscheid"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[color:var(--ink)] hover:text-[color:var(--accent)]"
                >
                  github.com/florishafkenscheid
                </a>
                <a
                  href="https://www.linkedin.com/in/florishafkenscheid/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[color:var(--ink)] hover:text-[color:var(--accent)]"
                >
                  linkedin.com/in/florishafkenscheid
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
                Response time
              </dt>
              <dd className="mt-1 text-[color:var(--ink-muted)]">
                Usually within 48 hours, Mon–Fri.
              </dd>
            </div>
          </dl>
        </aside>

        <div className="md:col-span-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
