"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin, Music2, Utensils, Wine } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const experiences: {
  icon: typeof Utensils;
  title: TranslationKey;
  description: TranslationKey;
}[] = [
  {
    icon: Utensils,
    title: "enLasNubes.restaurantTitle",
    description: "enLasNubes.restaurantDescription",
  },
  {
    icon: Music2,
    title: "enLasNubes.musicTitle",
    description: "enLasNubes.musicDescription",
  },
  {
    icon: Wine,
    title: "enLasNubes.cocktailsTitle",
    description: "enLasNubes.cocktailsDescription",
  },
];

type MenuMealKey = "breakfast" | "lunch" | "dinner";

interface MenuDish {
  title: TranslationKey;
  description: TranslationKey;
  image: string;
  portrait?: boolean;
}

interface MenuMeal {
  id: MenuMealKey;
  title: TranslationKey;
  price: TranslationKey;
  dishes: MenuDish[];
}

interface MenuTier {
  id: "standard" | "premium";
  title: TranslationKey;
  description: TranslationKey;
  meals: MenuMeal[];
}

const menuTiers: MenuTier[] = [
  {
    id: "standard",
    title: "enLasNubes.menuStandard",
    description: "enLasNubes.menuStandardDescription",
    meals: [
      {
        id: "breakfast",
        title: "enLasNubes.menuBreakfast",
        price: "enLasNubes.menu.standard.breakfast.price",
        dishes: [
          { title: "enLasNubes.dish.standard.breakfast.1.title", description: "enLasNubes.dish.standard.breakfast.1.description", image: "/images/en-las-nubes/menu/standard-breakfast-1.webp" },
          { title: "enLasNubes.dish.standard.breakfast.2.title", description: "enLasNubes.dish.standard.breakfast.2.description", image: "/images/en-las-nubes/menu/standard-breakfast-2.webp" },
          { title: "enLasNubes.dish.standard.breakfast.3.title", description: "enLasNubes.dish.standard.breakfast.3.description", image: "/images/en-las-nubes/menu/standard-breakfast-3.webp" },
          { title: "enLasNubes.dish.standard.breakfast.4.title", description: "enLasNubes.dish.standard.breakfast.4.description", image: "/images/en-las-nubes/menu/standard-breakfast-4.webp" },
        ],
      },
      {
        id: "lunch",
        title: "enLasNubes.menuLunch",
        price: "enLasNubes.menu.standard.lunch.price",
        dishes: [
          { title: "enLasNubes.dish.standard.lunch.1.title", description: "enLasNubes.dish.standard.lunch.1.description", image: "/images/en-las-nubes/menu/standard-lunch-1.webp" },
          { title: "enLasNubes.dish.standard.lunch.2.title", description: "enLasNubes.dish.standard.lunch.2.description", image: "/images/en-las-nubes/menu/standard-lunch-2.webp" },
          { title: "enLasNubes.dish.standard.lunch.3.title", description: "enLasNubes.dish.standard.lunch.3.description", image: "/images/en-las-nubes/menu/standard-lunch-3.webp" },
          { title: "enLasNubes.dish.standard.lunch.4.title", description: "enLasNubes.dish.standard.lunch.4.description", image: "/images/en-las-nubes/menu/standard-lunch-4.webp" },
        ],
      },
      {
        id: "dinner",
        title: "enLasNubes.menuDinner",
        price: "enLasNubes.menu.standard.dinner.price",
        dishes: [
          { title: "enLasNubes.dish.standard.dinner.1.title", description: "enLasNubes.dish.standard.dinner.1.description", image: "/images/en-las-nubes/menu/standard-dinner-1.webp" },
          { title: "enLasNubes.dish.standard.dinner.2.title", description: "enLasNubes.dish.standard.dinner.2.description", image: "/images/en-las-nubes/menu/standard-dinner-2.webp" },
          { title: "enLasNubes.dish.standard.dinner.3.title", description: "enLasNubes.dish.standard.dinner.3.description", image: "/images/en-las-nubes/menu/standard-dinner-3.webp" },
          { title: "enLasNubes.dish.standard.dinner.4.title", description: "enLasNubes.dish.standard.dinner.4.description", image: "/images/en-las-nubes/menu/standard-dinner-4.webp" },
        ],
      },
    ],
  },
  {
    id: "premium",
    title: "enLasNubes.menuPremium",
    description: "enLasNubes.menuPremiumDescription",
    meals: [
      {
        id: "breakfast",
        title: "enLasNubes.menuBreakfast",
        price: "enLasNubes.menu.premium.breakfast.price",
        dishes: [
          { title: "enLasNubes.dish.premium.breakfast.1.title", description: "enLasNubes.dish.premium.breakfast.1.description", image: "/images/en-las-nubes/menu/premium-breakfast-1.webp", portrait: true },
        ],
      },
      {
        id: "lunch",
        title: "enLasNubes.menuLunch",
        price: "enLasNubes.menu.premium.lunch.price",
        dishes: [
          { title: "enLasNubes.dish.premium.lunch.1.title", description: "enLasNubes.dish.premium.lunch.1.description", image: "/images/en-las-nubes/menu/premium-lunch-1.webp" },
          { title: "enLasNubes.dish.premium.lunch.2.title", description: "enLasNubes.dish.premium.lunch.2.description", image: "/images/en-las-nubes/menu/premium-lunch-2.webp" },
          { title: "enLasNubes.dish.premium.lunch.3.title", description: "enLasNubes.dish.premium.lunch.3.description", image: "/images/en-las-nubes/menu/premium-lunch-3.webp" },
        ],
      },
      {
        id: "dinner",
        title: "enLasNubes.menuDinner",
        price: "enLasNubes.menu.premium.dinner.price",
        dishes: [
          { title: "enLasNubes.dish.premium.dinner.1.title", description: "enLasNubes.dish.premium.dinner.1.description", image: "/images/en-las-nubes/menu/premium-dinner-1.webp" },
          { title: "enLasNubes.dish.premium.dinner.2.title", description: "enLasNubes.dish.premium.dinner.2.description", image: "/images/en-las-nubes/menu/premium-dinner-2.webp" },
          { title: "enLasNubes.dish.premium.dinner.3.title", description: "enLasNubes.dish.premium.dinner.3.description", image: "/images/en-las-nubes/menu/premium-dinner-3.webp" },
        ],
      },
    ],
  },
];

export default function EnLasNubesContent() {
  const { t } = useLanguage();
  const whatsappHref = `${siteConfig.socialLinks.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero conocer más sobre En las Nubes."
  )}`;

  return (
    <main>
      <section
        id="inicio"
        className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:min-h-screen"
      >
        <Image
          src={siteConfig.rooftop.image}
          alt="Ambiente del gastrobar En las Nubes en Cali"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,18,0.64)_0%,rgba(9,8,18,0.54)_42%,#0d0b08_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,73,190,0.18),transparent_58%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-7 flex items-end gap-1.5" aria-hidden="true">
            {[22, 38, 27, 46, 31, 40, 20].map((height, index) => (
              <span
                key={index}
                className="en-las-nubes-equalizer-bar w-1 rounded-full bg-[#39efff] shadow-[0_0_14px_rgba(57,239,255,0.9)]"
                style={{ height, animationDelay: `${index * 110}ms` }}
              />
            ))}
          </div>
          <span className="mb-5 text-[10px] font-semibold uppercase tracking-[0.48em] text-[#ffb5e3] sm:text-xs">
            {t("enLasNubes.eyebrow")}
          </span>
          <h1 className="en-las-nubes-logo-panel mb-3 w-[min(82vw,34rem)] px-4 py-3 sm:px-7 sm:py-4">
            <Image
              src={siteConfig.rooftop.logo}
              alt={t("enLasNubes.title")}
              width={802}
              height={258}
              priority
              unoptimized
              sizes="(max-width: 640px) 82vw, 544px"
              className="mx-auto h-auto w-full"
            />
          </h1>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#aefaff] sm:text-xs sm:tracking-[0.45em]">
            {t("enLasNubes.tagline")}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            {t("enLasNubes.description")}
          </p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#experiencia"
              className="en-las-nubes-neon inline-flex items-center justify-center gap-2 border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6bc7]"
            >
              {t("enLasNubes.explore")}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 bg-black/35 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:border-[#39efff]/80 hover:text-[#aefaff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39efff]"
            >
              {t("enLasNubes.reserve")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <a
            href="#experiencia"
            className="mt-14 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/65 transition-colors hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5 text-[#39efff]" aria-hidden="true" />
            {t("enLasNubes.scroll")}
          </a>
        </div>
      </section>

      <section
        id="experiencia"
        className="section-padding relative overflow-hidden bg-[var(--dark-bg)]"
        aria-labelledby="en-las-nubes-experience"
      >
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#f12da8]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#20d9ed]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.48em] text-[#ff8bd4]">
              {t("enLasNubes.sectionEyebrow")}
            </span>
            <h2
              id="en-las-nubes-experience"
              className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              {t("enLasNubes.sectionTitle")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {t("enLasNubes.sectionDescription")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <motion.article
                  key={experience.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="en-las-nubes-neon min-h-56 border p-7 sm:p-8"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#39efff]/40 bg-[#39efff]/5 text-[#75f4ff] shadow-[0_0_22px_rgba(57,239,255,0.16)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {t(experience.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {t(experience.description)}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <section
            id="carta"
            className="mt-24 scroll-mt-24"
            aria-labelledby="en-las-nubes-menu-title"
          >
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.48em] text-[#ff8bd4]">
                {t("enLasNubes.menuEyebrow")}
              </span>
              <h2
                id="en-las-nubes-menu-title"
                className="font-display text-4xl font-bold text-white sm:text-5xl"
              >
                {t("enLasNubes.menuTitle")}
              </h2>
              <p className="mx-auto mt-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {t("enLasNubes.menuDescription")}
              </p>
            </div>

            <nav
              aria-label={t("enLasNubes.menuChoose")}
              className="mb-12 grid gap-4 sm:grid-cols-2"
            >
              {menuTiers.map((tier) => (
                <Link
                  key={tier.id}
                  href={`#menu-${tier.id}`}
                  className="en-las-nubes-neon block scroll-mt-24 border px-6 py-5 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6bc7] sm:px-7"
                >
                  <span className="block font-display text-2xl font-semibold text-white">
                    {t(tier.title)}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                    {t(tier.description)}
                  </span>
                </Link>
              ))}
            </nav>

            <p className="mx-auto mb-16 max-w-3xl text-center text-xs leading-6 text-[var(--text-muted)]">
              {t("enLasNubes.menuPriceNote")}
            </p>

            <div className="space-y-20">
              {menuTiers.map((tier) => (
                <article
                  key={tier.id}
                  id={`menu-${tier.id}`}
                  className="scroll-mt-24"
                  aria-labelledby={`menu-${tier.id}-title`}
                >
                  <div className="mb-10 border-b border-[var(--gold)]/25 pb-6 text-center">
                    <h3
                      id={`menu-${tier.id}-title`}
                      className="font-display text-3xl font-semibold text-[var(--gold-light)] sm:text-4xl"
                    >
                      {t(tier.title)}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      {t(tier.description)}
                    </p>
                  </div>

                  <div className="space-y-12">
                    {tier.meals.map((meal) => (
                      <section
                        key={`${tier.id}-${meal.id}`}
                        id={`menu-${tier.id}-${meal.id}`}
                        className="scroll-mt-24"
                        aria-labelledby={`menu-${tier.id}-${meal.id}-title`}
                      >
                        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-l-2 border-[#ff73c8] pl-4 sm:pl-5">
                          <h4
                            id={`menu-${tier.id}-${meal.id}-title`}
                            className="font-display text-2xl font-semibold text-white sm:text-3xl"
                          >
                            {t(meal.title)}
                          </h4>
                          <span className="border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--gold-light)]">
                            {t(meal.price)}
                          </span>
                        </div>

                        <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
                          {meal.dishes.map((dish, index) => (
                            <article
                              key={dish.title}
                              className="group flex flex-col overflow-hidden border border-[#d6c6a5]/65 bg-[#f7f2e8] shadow-[0_8px_28px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1"
                            >
                              <div
                                className={`relative overflow-hidden bg-[#e7dfd1] ${
                                  dish.portrait ? "aspect-[4/5]" : "aspect-[16/9]"
                                }`}
                              >
                                <Image
                                  src={dish.image}
                                  alt={t(dish.title)}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                                    dish.portrait ? "object-[center_45%]" : ""
                                  }`}
                                />
                                <div
                                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5"
                                  aria-hidden="true"
                                />
                                <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white drop-shadow">
                                  {tier.id === "premium" && meal.id === "breakfast"
                                    ? t("enLasNubes.menuSingleOption")
                                    : t("enLasNubes.menuOption", { number: index + 1 })}
                                </span>
                              </div>
                              <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <h5 className="font-display text-xl font-semibold leading-snug text-[#32281e]">
                                  {t(dish.title)}
                                </h5>
                                <p className="mt-3 text-sm leading-6 text-[#665948]">
                                  {t(dish.description)}
                                </p>
                                <span
                                  className="mt-5 h-px w-12 bg-[var(--gold)]/75"
                                  aria-hidden="true"
                                />
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-16 grid overflow-hidden border border-white/10 bg-white/[0.025] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-72 sm:min-h-96">
              <Image
                src={siteConfig.rooftop.image}
                alt="Letrero de neón de En las Nubes, el gastrobar rooftop de Hotel Santelmo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090912]/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow sm:bottom-7 sm:left-7">
                <MapPin className="h-4 w-4 text-[#39efff]" aria-hidden="true" />
                {t("enLasNubes.location")}
              </div>
            </div>
            <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-12">
              <Image
                src={siteConfig.rooftop.logo}
                alt=""
                width={328}
                height={112}
                sizes="328px"
                unoptimized
                className="mb-6 h-auto w-52"
              />
              <p className="max-w-md text-sm leading-7 text-[var(--text-secondary)]">
                {t("enLasNubes.description")}
              </p>
              <a
                href={siteConfig.rooftop.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#aefaff] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39efff]"
              >
                {t("enLasNubes.instagram")}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
