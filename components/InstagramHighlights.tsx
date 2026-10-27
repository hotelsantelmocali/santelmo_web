"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const highlights = [
  {
    href: "https://www.instagram.com/stories/highlights/17932305797971023/",
    title: "instagram.highlight.about",
    image: "/images/nosotros-insta.jpeg",
  },
  {
    href: "https://www.instagram.com/stories/highlights/17894249166033310/",
    title: "instagram.highlight.gastrobar",
    image: "/images/gastrobar-insta.jpeg",
  },
  {
    href: "https://www.instagram.com/stories/highlights/17907727844567530/",
    title: "instagram.highlight.guests",
    image: "/images/clientes-insta.jpeg",
  },
] as const satisfies readonly {
  href: string;
  title: TranslationKey;
  image: string;
}[];

export default function InstagramHighlights() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden bg-[var(--dark-bg)]">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-[var(--gold)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:mb-14 md:flex-row md:text-left">
          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.5em] text-[var(--gold)]">
              {t("instagram.eyebrow")}
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t("instagram.title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {t("instagram.description")}
            </p>
          </div>

          <a
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border border-[var(--gold)]/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-light)] transition-colors hover:bg-[var(--gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            {t("instagram.visitProfile")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {highlights.map((highlight, index) => (
            <motion.a
              key={highlight.href}
              href={highlight.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagram.openHighlight", { number: index + 1 })}
              whileHover={{ y: -4 }}
              className="group relative isolate flex min-h-52 flex-col justify-between overflow-hidden border border-[var(--gold)]/30 bg-[var(--dark-card)] p-6 transition-colors hover:border-[var(--gold)]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] sm:min-h-64 sm:p-8"
            >
              <Image
                src={highlight.image}
                alt={t(highlight.title)}
                fill
                unoptimized={process.env.NODE_ENV === "development"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/95 via-[#0d0b08]/55 to-[#0d0b08]/35"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[var(--gold)]/10 transition-transform duration-500 group-hover:scale-125"
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-black/45 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--gold-light)] backdrop-blur-sm">
                  {t(highlight.title)}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-white/80 transition-colors group-hover:text-[var(--gold-light)]"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4 py-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold-light)]/70 bg-black/40 text-[var(--gold-light)] shadow-lg backdrop-blur-sm transition-colors group-hover:bg-black/60 sm:h-16 sm:w-16">
                  <Camera className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="text-center font-display text-lg text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {t("instagram.watchHighlight")}
                </span>
              </div>

              <span className="relative z-10 text-center text-[10px] uppercase tracking-[0.2em] text-[var(--gold-light)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                @hotelsantelmocali
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
