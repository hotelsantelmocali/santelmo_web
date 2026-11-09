"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";

const navTranslationKeys: Record<string, TranslationKey> = {
  "#inicio": "nav.home",
  "#nosotros": "nav.about",
  "#habitaciones": "nav.rooms",
  "#servicios": "nav.services",
  "#reserva": "nav.booking",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let flashTimer: number | undefined;

    const handleRooftopNavigation = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const isEnteringRooftop =
        window.location.pathname !== siteConfig.rooftop.url &&
        destination.pathname === siteConfig.rooftop.url;
      const isReturningHome =
        window.location.pathname === siteConfig.rooftop.url &&
        destination.pathname === "/";

      if (!isEnteringRooftop && !isReturningHome) return;

      const transitionClass = isEnteringRooftop
        ? "en-las-nubes-flash-forward"
        : "en-las-nubes-flash-back";
      const root = document.documentElement;
      root.classList.remove("en-las-nubes-flash-forward", "en-las-nubes-flash-back");
      void root.offsetWidth;
      root.classList.add(transitionClass);

      window.clearTimeout(flashTimer);
      flashTimer = window.setTimeout(() => {
        root.classList.remove(transitionClass);
      }, 1100);
    };

    document.addEventListener("click", handleRooftopNavigation);
    return () => document.removeEventListener("click", handleRooftopNavigation);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (window.location.pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ viewTransitionName: "site-header" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-dark border-b border-[var(--gold)]/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/#inicio"
              transitionTypes={["santelmo-home-return"]}
              onClick={(event) => {
                if (window.location.pathname === "/") {
                  event.preventDefault();
                  handleNavClick("#inicio");
                }
              }}
              className="flex items-center"
              aria-label={t("nav.logoAria")}
            >
              <BrandLogo loading="eager" className="h-auto w-32 sm:w-36 lg:w-40" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {siteConfig.navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors duration-300 relative group"
                >
                  {t(navTranslationKeys[link.href])}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Link
                href={siteConfig.rooftop.url}
                transitionTypes={["en-las-nubes-forward"]}
                onClick={() => setIsMobileOpen(false)}
                aria-label={t("nav.rooftopLogoAria")}
                className="rounded-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6bc7]"
              >
                <Image
                  src={siteConfig.rooftop.logo}
                  alt={t("nav.rooftopLogoAria")}
                  width={123}
                  height={40}
                  sizes="123px"
                  unoptimized
                  className="h-auto w-[104px] lg:w-[123px]"
                />
              </Link>
            </nav>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick("#reserva")}
              className="hidden md:block px-6 py-2.5 text-xs tracking-widest uppercase font-semibold border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--dark-bg)] transition-all duration-300"
            >
              {t("nav.booking")}
            </motion.button>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <button
                className="md:hidden p-2 text-[var(--gold)]"
                onClick={() => setIsMobileOpen((v) => !v)}
                aria-label={t("nav.mobileMenu")}
                aria-expanded={isMobileOpen}
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8"
          >
            {siteConfig.navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-3xl text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors tracking-widest uppercase"
              >
                {t(navTranslationKeys[link.href])}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: siteConfig.navLinks.length * 0.08, duration: 0.3 }}
            >
              <Link
                href={siteConfig.rooftop.url}
                transitionTypes={["en-las-nubes-forward"]}
                onClick={() => setIsMobileOpen(false)}
                aria-label={t("nav.rooftopLogoAria")}
                className="block rounded-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6bc7]"
              >
                <Image
                  src={siteConfig.rooftop.logo}
                  alt={t("nav.rooftopLogoAria")}
                  width={164}
                  height={53}
                  unoptimized
                  className="h-auto w-40"
                />
              </Link>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: siteConfig.navLinks.length * 0.08 }}
              onClick={() => handleNavClick("#reserva")}
              className="mt-4 px-10 py-4 text-sm tracking-widest uppercase font-semibold bg-[var(--gold)] text-[var(--dark-bg)]"
            >
              {t("nav.reserveNow")}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
