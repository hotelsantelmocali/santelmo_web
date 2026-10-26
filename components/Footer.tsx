"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const navTranslationKeys: Record<string, TranslationKey> = {
  "#inicio": "nav.home",
  "#nosotros": "nav.about",
  "#habitaciones": "nav.rooms",
  "#servicios": "nav.services",
  "#reserva": "nav.booking",
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="contacto"
      className="bg-[var(--dark-surface)] border-t border-[var(--dark-border)] pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <BrandLogo className="h-auto w-40" />
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <motion.a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "var(--gold)" }}
                className="w-9 h-9 flex items-center justify-center border border-[var(--dark-border)] hover:border-[var(--gold)] transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-5">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.href.replace("#", ""));
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors tracking-wide"
                  >
                    {t(navTranslationKeys[link.href])}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-5">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4">
              {siteConfig.contactPhones.map((phone) => (
                <a
                  key={phone.href}
                  href={`tel:${phone.href}`}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                  {phone.display}
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors break-all"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                {siteConfig.address}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--dark-border)] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © {siteConfig.name}. {t("footer.rights")}
          </p>
          <p>
            {t("footer.availability")}
          </p>
        </div>
      </div>
    </footer>
  );
}
