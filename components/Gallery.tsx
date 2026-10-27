"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import heroImage from "../public/images/hero.jpg";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const galleryItems = [
  {
    src: heroImage,
    alt: "hero.alt",
    title: "gallery.entrance",
  },
  {
    src: "/images/lobby.jpg",
    alt: "gallery.lobby",
    title: "gallery.lobby",
  },
  {
    src: "/images/suite-principal.jpg",
    alt: "gallery.couple",
    title: "gallery.couple",
  },
  {
    src: "/images/suite-doble.jpg",
    alt: "gallery.multiple",
    title: "gallery.multiple",
  },
  {
    src: "/images/habitacion-doble.jpg",
    alt: "gallery.simple",
    title: "gallery.simple",
  },
  {
    src: heroImage,
    alt: "gallery.experience",
    title: "gallery.experience",
  },
] as const satisfies readonly { src: typeof heroImage | string; alt: TranslationKey; title: TranslationKey }[];

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="galeria" className="section-padding bg-[var(--dark-surface)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(transparent 0%, rgba(201,168,76,0.2) 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-semibold block mb-4"
          >
            {t("gallery.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-[var(--gold)] mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, index) => (
            <motion.figure
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden border border-[var(--dark-border)] bg-[var(--dark-card)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={t(item.alt)}
                  fill
                  unoptimized={process.env.NODE_ENV === "development"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/80 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-xs tracking-[0.35em] uppercase text-[var(--gold)]">
                  {t(item.title)}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
