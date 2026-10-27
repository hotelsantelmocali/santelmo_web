"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "../public/images/hero.jpg";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={heroImage}
          alt={t("hero.alt")}
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 via-[var(--dark-bg)]/30 to-[var(--dark-bg)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark-bg)]/50 via-transparent to-[var(--dark-bg)]/20" />

      {/* Gold particle dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--gold)]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Logo mark */}
        <motion.div variants={itemVariants} className="mb-6 translate-y-4 sm:translate-y-0">
          <span className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-semibold">
            ✦ {t("hero.welcome")} ✦
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6"
        >
          <span className="block">{t("hero.title.first")}</span>
          <span className="block shimmer-gold">{t("hero.title.second")}</span>
          <span className="block text-white">{t("hero.title.third")}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-[var(--text-secondary)] tracking-widest mb-10 uppercase"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(201,168,76,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("reserva")}
            className="px-10 py-4 bg-[var(--gold)] text-[var(--dark-bg)] text-sm font-bold tracking-widest uppercase transition-all"
          >
            {t("hero.availability")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("habitaciones")}
            className="px-10 py-4 border border-white/40 text-white text-sm font-semibold tracking-widest uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
          >
            {t("hero.viewRooms")}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("galeria")}
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--gold)] flex flex-col items-center gap-1 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]">
          {t("hero.discover")}
        </span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
}
