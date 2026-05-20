export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-[color:var(--hairline)] px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 text-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-subtle)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span>Designed &amp; built by Floris Hafkenscheid</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/florishafkenscheid"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--ink)]"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/florishafkenscheid/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--ink)]"
          >
            linkedin
          </a>
          <a href="mailto:floris@hafkenscheid.com" className="hover:text-[color:var(--ink)]">
            email
          </a>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
