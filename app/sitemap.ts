import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
    },
    {
      url: new URL(siteConfig.rooftop.url, siteConfig.url).toString(),
    },
  ];
}
