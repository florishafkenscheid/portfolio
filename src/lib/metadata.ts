import type { Metadata } from "next";

const SITE_NAME = "Floris Hafkenscheid";

/**
 * Title, description and link-preview metadata for one page. Child segments
 * replace `openGraph` / `twitter` wholesale rather than merging, so every page
 * builds the full objects here. Preview images come from the nearest
 * `opengraph-image.tsx`.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en",
      type,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
