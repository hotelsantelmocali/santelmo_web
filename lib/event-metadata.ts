import type { Metadata } from "next";
import {
  eventLocales,
  getEventLanguageAlternates,
  getEventUrl,
  isUpcomingEvent,
  type EventDocument,
  type EventLocale,
} from "@/lib/events";

const landingMetadata = {
  es: {
    title: "Eventos en Cali y Valle del Cauca | Hotel Santelmo",
    description:
      "Consulta próximos eventos en Cali y sus alrededores: fechas, lugares y detalles. Planea tu visita y reserva hospedaje en el sur de Cali con Hotel Santelmo.",
  },
  en: {
    title: "Events in Cali and Valle del Cauca | Hotel Santelmo",
    description:
      "Explore upcoming events in Cali and nearby towns, including dates, venues, and details. Plan your visit and book a stay in southern Cali with Hotel Santelmo.",
  },
} satisfies Record<EventLocale, { title: string; description: string }>;

export function getEventsLandingMetadata(locale: EventLocale): Metadata {
  const details = landingMetadata[locale];
  const canonical = getEventUrl(locale);
  const alternateLocale: EventLocale = locale === "es" ? "en" : "es";

  return {
    title: { absolute: details.title },
    description: details.description,
    alternates: {
      canonical,
      languages: {
        [eventLocales[locale].languageTag]: canonical,
        [eventLocales[alternateLocale].languageTag]: getEventUrl(alternateLocale),
      },
    },
    openGraph: {
      type: "website",
      locale: eventLocales[locale].languageTag.replace("-", "_"),
      url: canonical,
      title: details.title,
      description: details.description,
      siteName: "Hotel Santelmo",
    },
    twitter: {
      card: "summary",
      title: details.title,
      description: details.description,
    },
  };
}

export function getEventMetadata(
  event: EventDocument,
  locale: EventLocale
): Metadata {
  const { data } = event;
  const title =
    data.meta_title?.trim() ||
    (locale === "es"
      ? `${data.title} en Cali | Hotel Santelmo`
      : `${data.title} in Cali | Hotel Santelmo`);
  const description =
    data.meta_description?.trim() ||
    data.summary?.trim() ||
    (locale === "es"
      ? `${data.title}: fecha, lugar y detalles del evento en Cali y sus alrededores.`
      : `${data.title}: date, venue, and details for this event in Cali and nearby towns.`);
  const canonical = getEventUrl(locale, event.uid);
  const image = data.seo_image.url || data.hero_image.url;
  const shouldIndex = isUpcomingEvent(event);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: getEventLanguageAlternates(event, locale),
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale: eventLocales[locale].languageTag.replace("-", "_"),
      url: canonical,
      title,
      description,
      siteName: "Hotel Santelmo",
      images: image ? [{ url: image, alt: data.title || title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
