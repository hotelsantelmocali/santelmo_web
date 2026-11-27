import { eventLocales, type EventLocale } from "@/lib/events";
import Footer from "@/components/Footer";
import EventsHeader from "./EventsHeader";

export default function EventsLoading({ locale }: { locale: EventLocale }) {
  const otherLocale: EventLocale = locale === "es" ? "en" : "es";

  return (
    <>
    <main lang={locale === "es" ? "es" : "en"} className="min-h-screen bg-[var(--dark-bg)]">
      <EventsHeader
        locale={locale}
        alternateHref={eventLocales[otherLocale].href}
      />
      <div
        className="mx-auto max-w-7xl px-4 pb-20 pt-40 text-center text-sm text-[var(--text-secondary)] sm:px-6 lg:px-8"
        role="status"
      >
        {locale === "es" ? "Cargando eventos..." : "Loading events..."}
      </div>
    </main>
    <Footer locale={locale} />
    </>
  );
}
