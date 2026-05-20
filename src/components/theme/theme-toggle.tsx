"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-9 w-[3.75rem] items-center rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)]/70 px-1 backdrop-blur-sm"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="relative h-7 w-7 rounded-full bg-[color:var(--accent)] shadow-[0_8px_20px_-6px_var(--ring)]"
        style={{ marginLeft: isDark ? 0 : "calc(100% - 1.75rem)" }}
      >
        <span className="absolute inset-0 grid place-items-center text-[10px] font-mono uppercase tracking-wider text-[color:var(--accent-ink)]">
          {isDark ? "DK" : "LT"}
        </span>
      </motion.span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
