import { useEffect, useState } from "react";
import { X, Moon } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "bajram-popup-2026-dismissed";

const BajramPopup = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const timer = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setShown(true));
    }, 900);
    return () => clearTimeout(timer);
  }, []);


  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bajram-title"
      className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-8 animate-fade-in"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-cocoa/70 backdrop-blur-sm"
      />

      {/* card */}
      <div className="relative w-full max-w-lg bg-cream shadow-elegant border border-cocoa/10 overflow-hidden animate-scale-in">
        {/* warm glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[28rem] h-[20rem] rounded-full bg-rose/30 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-paper opacity-50" />

        {/* close */}
        <button
          type="button"
          onClick={close}
          aria-label={t("bajram.dismiss")}
          className="absolute top-4 right-4 z-10 p-2 text-cocoa/50 hover:text-cocoa transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-8 md:px-12 py-12 md:py-14 text-center">
          {/* crescent ornament */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-10 bg-terracotta/40" />
            <Moon className="w-5 h-5 text-terracotta -rotate-12" strokeWidth={1.5} />
            <div className="h-px w-10 bg-terracotta/40" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.4em] text-terracotta mb-5">
            {t("bajram.kicker")}
          </p>
          <h2
            id="bajram-title"
            className="font-display text-3xl md:text-4xl text-cocoa leading-tight text-balance"
          >
            {t("bajram.title")}
          </h2>

          <div className="w-px h-10 bg-cocoa/20 mx-auto my-7" />

          <p className="font-display italic text-cocoa/75 text-lg md:text-xl leading-relaxed text-balance">
            {t("bajram.quote")}
          </p>

          <p className="font-body text-cocoa/60 text-sm leading-relaxed mt-6 max-w-sm mx-auto">
            {t("bajram.body")}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#order"
              onClick={close}
              className="inline-block px-8 py-3.5 bg-cocoa text-cream text-[11px] uppercase tracking-[0.3em] hover:bg-terracotta transition-colors duration-500"
            >
              {t("bajram.cta")}
            </a>
            <button
              type="button"
              onClick={close}
              className="text-[11px] uppercase tracking-[0.3em] text-cocoa/50 hover:text-cocoa transition-colors px-4 py-3"
            >
              {t("bajram.dismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BajramPopup;
