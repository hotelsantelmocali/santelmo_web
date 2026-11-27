import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import {
  eventLocales,
  formatEventDate,
  getEventArrivalDate,
  getEventPath,
  type EventDocument,
  type EventLocale,
} from "@/lib/events";
import EventsHeader from "./EventsHeader";

const listingCopy = {
  es: {
    eyebrow: "Agenda local · Hotel Santelmo",
    title: "Eventos en Cali y el Valle del Cauca",
    intro:
      "Encuentra fechas, lugares y detalles de próximos eventos en Cali y sus alrededores. Planea tu visita con tiempo y reserva tu hospedaje en el sur de la ciudad.",
    upcoming: "Próximos eventos",
    emptyTitle: "Pronto habrá nuevos eventos",
    emptyDescription:
      "Estamos preparando la agenda de Cali y sus alrededores. Vuelve pronto para descubrir nuevas fechas.",
    details: "Ver detalles",
    book: "Reservar hospedaje",
    locationFallback: "Cali, Valle del Cauca",
    stayNote: "Hospédate en el sur de Cali",
  },
  en: {
    eyebrow: "Local calendar · Hotel Santelmo",
    title: "Events in Cali and Valle del Cauca",
    intro:
      "Find dates, venues, and details for upcoming events in Cali and nearby towns. Plan ahead and book your stay in the south of the city.",
    upcoming: "Upcoming events",
    emptyTitle: "New events coming soon",
    emptyDescription:
      "We are preparing the calendar for Cali and nearby towns. Check back soon for upcoming dates.",
    details: "View details",
    book: "Book your stay",
    locationFallback: "Cali, Valle del Cauca",
    stayNote: "Stay in southern Cali",
  },
} satisfies Record<
  EventLocale,
  Record<string, string>
>;

export default function EventsListing({
  locale,
  events,
}: {
  locale: EventLocale;
  events: EventDocument[];
}) {
  const copy = listingCopy[locale];
  const otherLocale: EventLocale = locale === "es" ? "en" : "es";

  return (
    <main lang={locale === "es" ? "es" : "en"} className="min-h-screen bg-[var(--dark-bg)]">
      <EventsHeader locale={locale} alternateHref={eventLocales[otherLocale].href} />
      <section className="relative overflow-hidden border-b border-[var(--gold)]/15 px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.13),transparent_58%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
            {copy.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {copy.intro}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="upcoming-events"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
              {copy.stayNote}
            </p>
            <h2
              id="upcoming-events"
              className="font-display text-3xl font-semibold text-white sm:text-4xl"
            >
              {copy.upcoming}
            </h2>
          </div>
          <Link
            href="/#reserva"
            className="border border-[var(--gold)] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[var(--gold-light)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--dark-bg)]"
          >
            {copy.book}
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="border border-[var(--dark-border)] bg-[var(--dark-card)] px-6 py-12 text-center">
            <h3 className="font-display text-2xl font-semibold text-white">
              {copy.emptyTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
              {copy.emptyDescription}
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const { data } = event;
              if (!data.title || !data.start_date) return null;

              const title = data.title || "";
              const location = [data.venue, data.city, data.region]
                .filter(Boolean)
                .join(" · ") || copy.locationFallback;
              const detailHref = getEventPath(locale, event.uid);
              const bookingHref = `/?checkIn=${getEventArrivalDate(data.start_date)}#reserva`;

              return (
                <li
                  key={event.id}
                  className="group flex flex-col overflow-hidden border border-[var(--dark-border)] bg-[var(--dark-card)] transition-colors hover:border-[var(--gold)]/50"
                >
                  <Link href={detailHref} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--dark-surface)]">
                      {data.hero_image.url ? (
                        <Image
                          src={data.hero_image.url}
                          alt={data.hero_image.alt || title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.2),transparent_70%)]" />
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <time
                      dateTime={data.start_date}
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)]"
                    >
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {formatEventDate(data.start_date, locale)}
                      {data.start_time ? ` · ${data.start_time}` : ""}
                    </time>
                    <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-white">
                      <Link href={detailHref} className="transition-colors group-hover:text-[var(--gold-light)]">
                        {title}
                      </Link>
                    </h3>
                    {data.summary && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                        {data.summary}
                      </p>
                    )}
                    <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--text-muted)]">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" aria-hidden="true" />
                      {location}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                      <Link
                        href={detailHref}
                        className="text-xs font-bold uppercase tracking-widest text-[var(--gold-light)] hover:text-white"
                      >
                        {copy.details}
                      </Link>
                      <Link
                        href={bookingHref}
                        className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--gold-light)]"
                      >
                        {copy.book}
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
