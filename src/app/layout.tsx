import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { pageMetadata } from "@/lib/metadata";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Sun } from "@/components/sun/sun";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blousy.dev"),
  ...pageMetadata({
    title: "Floris Hafkenscheid",
    description:
      "Projects by Floris Hafkenscheid, a computer-science graduate working on Rust backends, identity infrastructure and developer tools.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative">
        <ThemeProvider>
          <Sun />
          <Nav />
          <main className="relative z-10 pt-32 md:pt-40">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
