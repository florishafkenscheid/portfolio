import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-6 py-32 md:px-10">
      <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-subtle)]">
        404 · off the map
      </p>
      <h1 className="text-display text-[clamp(4rem,14vw,10rem)] leading-[0.85] text-[color:var(--ink)]">
        Nothing
        <br />
        here.
      </h1>
      <p className="max-w-prose text-lg text-[color:var(--ink-muted)]">
        The page you&apos;re after doesn&apos;t exist (anymore, or yet).
        Drift back to the index.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm text-[color:var(--bg)]"
      >
        Take me home
      </Link>
    </section>
  );
}
