"use client";

import { useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const STORAGE_KEY = "hotel-santelmo-cookie-notice-v1";
const noticeListeners = new Set<() => void>();

function subscribeToNotice(listener: () => void) {
  noticeListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    noticeListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getNoticeVisibility() {
  return window.localStorage.getItem(STORAGE_KEY) !== "dismissed";
}

export default function CookieNotice() {
  const isVisible = useSyncExternalStore(
    subscribeToNotice,
    getNoticeVisibility,
    () => false
  );
  const { t } = useLanguage();

  const dismissNotice = () => {
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
    noticeListeners.forEach((listener) => listener());
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label={t("cookies.title")}
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl border border-[var(--gold)]/35 bg-[#17120c]/95 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:bottom-6 sm:flex sm:items-center sm:gap-5 sm:p-5"
    >
      <Cookie
        className="mb-3 h-6 w-6 shrink-0 text-[var(--gold)] sm:mb-0"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-base text-[var(--gold-light)]">
          {t("cookies.title")}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          {t("cookies.description")}
        </p>
      </div>
      <button
        type="button"
        onClick={dismissNotice}
        className="mt-4 w-full shrink-0 border border-[var(--gold)]/60 px-4 py-2.5 text-xs font-semibold tracking-widest text-[var(--gold-light)] transition-colors hover:bg-[var(--gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] sm:mt-0 sm:w-auto"
      >
        {t("cookies.dismiss")}
      </button>
    </aside>
  );
}
