import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { siteConfig } from "@/config/site";
import {
  eventLocales,
  getEventLanguageAlternates,
  getEventUrl,
  getEvents,
  type EventDocument,
  type EventLocale,
} from "@/lib/events";

function eventSitemapEntry(
  event: EventDocument,
  locale: EventLocale
): MetadataRoute.Sitemap[number] {
  return {
    url: getEventUrl(locale, event.uid),
    lastModified: event.last_publication_date || event.data.start_date || undefined,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: getEventLanguageAlternates(event, locale),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const [spanishEvents, englishEvents] = await Promise.all([
    getEvents("es"),
    getEvents("en"),
  ]);
  const languageAlternates = {
    [eventLocales.es.languageTag]: getEventUrl("es"),
    [eventLocales.en.languageTag]: getEventUrl("en"),
  };

  return [
    {
      url: siteConfig.url,
    },
    {
      url: new URL(siteConfig.rooftop.url, siteConfig.url).toString(),
    },
    {
      url: getEventUrl("es"),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: languageAlternates },
    },
    {
      url: getEventUrl("en"),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: languageAlternates },
    },
    ...spanishEvents.map((event) => eventSitemapEntry(event, "es")),
    ...englishEvents.map((event) => eventSitemapEntry(event, "en")),
  ];
}
