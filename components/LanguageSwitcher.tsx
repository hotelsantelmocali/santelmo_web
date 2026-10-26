"use client";

import { useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  languageCodes,
  languageNames,
  type Language,
} from "@/i18n/translations";

const supportedLanguages: Language[] = ["es", "en", "pt"];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("language.select")}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="group flex items-center gap-2 rounded-full border border-[var(--gold)]/35 bg-black/20 px-3 py-2 text-[var(--gold-light)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span className="text-[10px] font-semibold tracking-[0.16em]">
          {languageCodes[language]}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={t("language.select")}
          className="absolute right-0 top-full z-[60] mt-3 min-w-44 overflow-hidden rounded-sm border border-[var(--gold)]/30 bg-[#17120c]/95 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {supportedLanguages.map((option) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={language === option}
              onClick={() => {
                setLanguage(option);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-5 px-3 py-2.5 text-left text-xs transition-colors ${
                language === option
                  ? "bg-[var(--gold)]/10 text-[var(--gold-light)]"
                  : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{languageNames[option]}</span>
              {language === option && (
                <Check className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
