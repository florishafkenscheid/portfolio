"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Index", index: "00" },
  { href: "/projects", label: "Projects", index: "01" },
  { href: "/info", label: "Info", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
] as const;

export function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-6 py-5 md:px-10 md:py-7">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-3 text-mono text-xs uppercase tracking-[0.18em] text-[color:var(--ink)]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_var(--ring)]" />
          <span>F. Hafkenscheid</span>
          <span className="hidden text-[color:var(--ink-subtle)] sm:inline">— Portfolio · 2026</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)]/60 px-2 py-1.5 backdrop-blur-md md:flex">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "text-[color:var(--accent-ink)]"
                    : "text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="text-mono text-[10px] opacity-60">{link.index}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="mx-auto mt-4 flex max-w-[1400px] items-center gap-1 overflow-x-auto rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)]/60 px-2 py-1.5 backdrop-blur-md md:hidden">
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs",
                active
                  ? "text-[color:var(--accent-ink)]"
                  : "text-[color:var(--ink-muted)]"
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill-mobile"
                  className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="text-mono text-[9px] opacity-60">{link.index}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
