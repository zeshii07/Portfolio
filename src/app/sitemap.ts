import type { MetadataRoute } from "next";

const SITE_URL = "https://zeeshandeveloper.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page portfolio — one canonical URL plus the named anchor
  // sections that search engines may surface for sitelinks.
  const sections = [
    "about",
    "projects",
    "skills",
    "experience",
    "open-to-opportunities",
    "contact",
  ];

  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sections.map((section) => ({
      url: `${SITE_URL}/#${section}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
