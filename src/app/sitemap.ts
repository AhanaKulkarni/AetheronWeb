import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/founders`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
