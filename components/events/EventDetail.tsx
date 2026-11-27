import { asLink } from "@prismicio/client";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  eventLocales,
  formatEventDate,
  getEventArrivalDate,
  getEventUrl,
  getLocalizedEventHref,
  toEventSchemaDate,
  type EventDocument,
  type EventLocale,
} from "@/lib/events";
import EventsHeader from "./EventsHeader";
import { PrismicRichText } from "@prismicio/react";

const detailCopy = {
  es: {
    events: "Eventos",
    bookEyebrow: "Planea tu visita",
    bookTitle: "Quédate cerca del evento",
    bookDescription:
      "Consulta disponibilidad en Hotel Santelmo y organiza tu estadía en el sur de Cali.",
    book: "Consultar hospedaje",
    arrival: "Llegada sugerida",
    ticket: "Información y entradas",
    location: "Lugar",
  },
  en: {
    events: "Events",
    bookEyebrow: "Plan your visit",
    bookTitle: "Stay near the event",
    bookDescription:
      "Check availability at Hotel Santelmo and plan your stay in southern Cali.",
    book: "Check hotel availability",
    arrival: "Suggested arrival",
    ticket: "Tickets and information",
    location: "Venue",
  },
} satisfies Record<
  EventLocale,
  Record<string, string>
>;

export default function EventDetail({
  event,
  locale,
}: {
  event: EventDocument;
  locale: EventLocale;
}) {
  const { data } = event;
  const copy = detailCopy[locale];
  const startDate = data.start_date;
  if (!startDate) return null;

  const title = data.title || "";
  const alternateHref = getLocalizedEventHref(event, locale);
  const bookingHref = `/?checkIn=${getEventArrivalDate(startDate)}#reserva`;
  const ticketUrl = asLink(data.ticket_url);
  const locationName = data.venue || data.city || "Cali";
  const address = {
    "@type": "PostalAddress",
    ...(data.address ? { streetAddress: data.address } : {}),
    addressLocality: data.city || "Cali",
    addressRegion: data.region || "Valle del Cauca",
    addressCountry: "CO",
  };
  const endDate =
    data.end_date && data.end_date >= startDate
      ? toEventSchemaDate(data.end_date, data.end_time)
      : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description: data.summary || title,
    startDate: toEventSchemaDate(startDate, data.start_time),
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: getEventUrl(locale, event.uid),
    location: {
      "@type": "Place",
      name: locationName,
      address,
    },
    ...(data.hero_image.url ? { image: [data.hero_image.url] } : {}),
    ...(data.organizer
      ? {
          organizer: {
            "@type": "Organization",
            name: data.organizer,
          },
        }
      : {}),
  };

  return (
    <main lang={locale === "es" ? "es" : "en"} className="min-h-screen bg-[var(--dark-bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <EventsHeader locale={locale} alternateHref={alternateHref} />
      <article className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <nav aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}>
          <ol className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <li>
              <Link href={eventLocales[locale].href} className="hover:text-[var(--gold-light)]">
                {copy.events}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 text-[var(--text-secondary)]">
              {title}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            {data.hero_image.url && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden border border-[var(--gold)]/20 bg-[var(--dark-card)]">
                <Image
                  src={data.hero_image.url}
                  alt={data.hero_image.alt || title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)]">
              <time dateTime={startDate} className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatEventDate(startDate, locale)}
                {data.start_time ? ` · ${data.start_time}` : ""}
              </time>
              {(data.venue || data.city) && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {[data.venue, data.city].filter(Boolean).join(" · ")}
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {title}
            </h1>
            {data.summary && (
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                {data.summary}
              </p>
            )}

            {data.description && (
              <div className="mt-8 space-y-5 text-base leading-8 text-[var(--text-secondary)] [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:text-white [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-white [&_li]:ml-6 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:mb-5 [&_strong]:text-white">
                <PrismicRichText field={data.description} />
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="border border-[var(--gold)]/35 bg-[var(--dark-card)] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                {copy.bookEyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                {copy.bookTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {copy.bookDescription}
              </p>
              <p className="mt-5 border-t border-[var(--dark-border)] pt-4 text-xs text-[var(--text-muted)]">
                {copy.arrival}:{" "}
                <span className="text-[var(--text-secondary)]">
                  {formatEventDate(getEventArrivalDate(startDate), locale)}
                </span>
              </p>
              <Link
                href={bookingHref}
                className="mt-5 flex w-full items-center justify-center bg-[var(--gold)] px-4 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-[var(--dark-bg)] transition-colors hover:bg-[var(--gold-light)]"
              >
                {copy.book}
              </Link>
            </div>

            {ticketUrl && (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-[var(--dark-border)] px-5 py-4 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-light)]"
              >
                {copy.ticket}
              </a>
            )}

            {(data.address || data.venue || data.city) && (
              <div className="border border-[var(--dark-border)] bg-[var(--dark-card)] p-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                  {copy.location}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {[data.venue, data.address, data.city, data.region]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
}
