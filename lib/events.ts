import {
  NotFoundError,
  type AnyRegularField,
  type DateField,
  type ImageField,
  type KeyTextField,
  type LinkField,
  type PrismicDocumentWithUID,
  type RichTextField,
} from "@prismicio/client";
import { cacheLife, cacheTag } from "next/cache";
import { siteConfig } from "@/config/site";
import { createClient } from "@/prismicio";

export type EventLocale = "es" | "en";

export const eventCacheTag = "prismic-events";

export const eventLocales: Record<
  EventLocale,
  { prismicLocale: string; href: string; languageTag: string }
> = {
  es: {
    prismicLocale: process.env.PRISMIC_LOCALE_ES || "es-co",
    href: "/eventos",
    languageTag: "es-CO",
  },
  en: {
    prismicLocale: process.env.PRISMIC_LOCALE_EN || "en-us",
    href: "/events",
    languageTag: "en-US",
  },
};

interface EventData extends Record<string, AnyRegularField> {
  title: KeyTextField;
  summary: KeyTextField;
  start_date: DateField;
  start_time: KeyTextField;
  end_date: DateField;
  end_time: KeyTextField;
  venue: KeyTextField;
  address: KeyTextField;
  city: KeyTextField;
  region: KeyTextField;
  organizer: KeyTextField;
  hero_image: ImageField;
  seo_image: ImageField;
  description: RichTextField;
  ticket_url: LinkField;
  meta_title: KeyTextField;
  meta_description: KeyTextField;
}

export type EventDocument = PrismicDocumentWithUID<EventData, "event", string>;

export function getEventPath(locale: EventLocale, uid: string) {
  return `${eventLocales[locale].href}/${encodeURIComponent(uid)}`;
}

export function getLocalizedEventHref(event: EventDocument, locale: EventLocale) {
  const otherLocale: EventLocale = locale === "es" ? "en" : "es";
  const translation = event.alternate_languages.find(
    (alternate) =>
      alternate.lang === eventLocales[otherLocale].prismicLocale &&
      alternate.type === "event"
  );

  return translation?.uid
    ? getEventPath(otherLocale, translation.uid)
    : eventLocales[otherLocale].href;
}

export function getEventLanguageAlternates(
  event: EventDocument,
  locale: EventLocale
) {
  const otherLocale: EventLocale = locale === "es" ? "en" : "es";
  const alternate = event.alternate_languages.find(
    (language) =>
      language.lang === eventLocales[otherLocale].prismicLocale &&
      language.type === "event"
  );
  const languages: Record<string, string> = {
    [eventLocales[locale].languageTag]: getEventUrl(locale, event.uid),
  };

  if (alternate?.uid) {
    languages[eventLocales[otherLocale].languageTag] = getEventUrl(
      otherLocale,
      alternate.uid
    );
  }

  return languages;
}

export function getColombiaDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to determine today's date in Colombia.");
  }

  return `${year}-${month}-${day}`;
}

export function getEventArrivalDate(startDate: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new Error(`Invalid Prismic event start date: ${startDate}`);
  }

  const arrival = new Date(`${startDate}T00:00:00.000Z`);
  arrival.setUTCDate(arrival.getUTCDate() - 1);
  const arrivalDate = arrival.toISOString().slice(0, 10);
  const today = getColombiaDate();

  return arrivalDate < today ? today : arrivalDate;
}

export function isUpcomingEvent(
  event: EventDocument,
  today = getColombiaDate()
) {
  const startDate = event.data.start_date;
  return Boolean(startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate) && startDate >= today);
}

export async function getEvents(locale: EventLocale) {
  "use cache";
  cacheLife("max");
  cacheTag(eventCacheTag);

  const client = createClient();
  const events = await client.getAllByType<EventDocument>("event", {
    lang: eventLocales[locale].prismicLocale,
  });
  const today = getColombiaDate();

  return events
    .filter((event) => isUpcomingEvent(event, today))
    .sort((left, right) =>
      (left.data.start_date ?? "").localeCompare(right.data.start_date ?? "")
    );
}

export async function getEvent(uid: string, locale: EventLocale) {
  "use cache";
  cacheLife("max");
  cacheTag(eventCacheTag);

  const client = createClient();

  try {
    return await client.getByUID<EventDocument>("event", uid, {
      lang: eventLocales[locale].prismicLocale,
    });
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}

export function getEventUrl(locale: EventLocale, uid?: string) {
  const path = uid ? getEventPath(locale, uid) : eventLocales[locale].href;
  return new URL(path, siteConfig.url).toString();
}

export function formatEventDate(date: string, locale: EventLocale) {
  return new Intl.DateTimeFormat(eventLocales[locale].languageTag, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date(`${date}T12:00:00-05:00`));
}

export function toEventSchemaDate(date?: string | null, time?: string | null) {
  if (!date) return undefined;
  if (time && /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return `${date}T${time}:00-05:00`;
  }
  return date;
}
