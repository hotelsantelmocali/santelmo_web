"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BedDouble, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

const stats = [
  { icon: Award, value: "18", label: "about.stat.years" },
  { icon: BedDouble, value: "14", label: "about.stat.rooms" },
  { icon: Clock, value: "24/7", label: "about.stat.reception" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12 },
  }),
};

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="nosotros" className="section-padding bg-[var(--dark-surface)] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--gold)]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/lobby.jpg"
                alt={t("about.alt")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/40 to-transparent" />
            </div>
            {/* Gold accent border */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full border border-[var(--gold)]/30 -z-10"
              style={{ transform: "translate(12px, 12px)" }}
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 left-6 glass-dark px-6 py-4 border border-[var(--gold)]/30"
            >
              <span className="text-[var(--gold)] font-display text-2xl font-bold block">{t("about.years")}</span>
              <span className="text-xs text-[var(--text-secondary)] tracking-widest uppercase">{t("about.welcome")}</span>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <div className="space-y-6">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] font-semibold">
                {t("about.eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {t("about.title.first")}{" "}
              <span className="text-[var(--gold)]">{t("about.title.highlight")}</span>
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-16 h-px bg-[var(--gold)]"
            />

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[var(--text-secondary)] leading-relaxed"
            >
              {t("about.paragraph.first")}
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[var(--text-secondary)] leading-relaxed"
            >
              {t("about.paragraph.second", { address: siteConfig.address })}
            </motion.p>

            {/* Stats */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: "var(--gold)" }} />
                  <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 leading-tight">{t(stat.label)}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
