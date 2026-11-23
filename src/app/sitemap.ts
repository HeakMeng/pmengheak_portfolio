import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/portfolio";

/** Single-page site: the home page and the résumé PDF are the only documents worth indexing. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: PROFILE.site, changeFrequency: "monthly", priority: 1 },
    { url: `${PROFILE.site}${PROFILE.resume}`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
