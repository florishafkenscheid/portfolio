import { OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Floris Hafkenscheid, portfolio at blousy.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Portfolio",
    title: "Floris Hafkenscheid",
    summary:
      "Computer-science graduate. Rust backends, identity infrastructure and developer tools.",
  });
}
