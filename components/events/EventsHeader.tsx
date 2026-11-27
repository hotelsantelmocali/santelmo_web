import Link from "next/link";
import { eventLocales, type EventLocale } from "@/lib/events";
import BrandLogo from "@/components/BrandLogo";

export default function EventsHeader({
  locale,
  alternateHref,
}: {
  locale: EventLocale;
  alternateHref: string;
}) {
  const isEnglish = locale === "en";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--gold)]/20 bg-[rgba(13,11,8,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={isEnglish ? "Hotel Santelmo home" : "Inicio de Hotel Santelmo"}
        >
          <BrandLogo className="h-auto w-32 sm:w-40" loading="eager" />
        </Link>
        <nav
          aria-label={isEnglish ? "Events navigation" : "Navegación de eventos"}
          className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] sm:gap-6 sm:text-xs"
        >
          <Link
            href={eventLocales[locale].href}
            className="hidden text-[var(--gold-light)] sm:inline"
            aria-current="page"
          >
            {isEnglish ? "Events" : "Eventos"}
          </Link>
          <Link
            href="/#reserva"
            className="hidden text-[var(--text-secondary)] transition-colors hover:text-[var(--gold-light)] sm:inline"
          >
            {isEnglish ? "Book a stay" : "Reservar hospedaje"}
          </Link>
          <div
            aria-label={isEnglish ? "Choose events language" : "Idioma de eventos"}
            className="flex items-center gap-2"
          >
            <Link
              href={locale === "es" ? eventLocales.es.href : alternateHref}
              hrefLang="es"
              lang="es"
              aria-current={locale === "es" ? "page" : undefined}
              className={locale === "es" ? "text-white" : "text-[var(--text-secondary)] hover:text-white"}
            >
              ES
            </Link>
            <span className="text-[var(--gold-dark)]" aria-hidden="true">
              /
            </span>
            <Link
              href={locale === "en" ? eventLocales.en.href : alternateHref}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
              className={locale === "en" ? "text-white" : "text-[var(--text-secondary)] hover:text-white"}
            >
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
