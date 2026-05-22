import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const prices = [
  { name: { sr: "Krofnice", sq: "Petulla", en: "Donuts" }, price: "€0.50" },
  { name: { sr: "Breskvice", sq: "Pjeshkë", en: "Peaches" }, price: "€0.50" },
  { name: { sr: "Oraščići", sq: "Guacka arrash", en: "Walnut Shells" }, price: "€0.40" },
  { name: { sr: "Tartuf rolat", sq: "Rul me tartufë", en: "Truffle Roll" }, price: "€0.60" },
  { name: { sr: "Polumeseci", sq: "Gjysmëhëna", en: "Crescents" }, price: "€0.60" },
  { name: { sr: "Kafena zrna", sq: "Kokrra kafeje", en: "Coffee Beans" }, price: "€0.40" },
];

const labels = {
  sr: { kicker: "Cenovnik", title: "Naš Cenovnik", note: "Ručno rađeni deserti", tooltip: "Pogledajte cene" },
  sq: { kicker: "Çmimorja", title: "Çmimorja Jonë", note: "Ëmbëlsira të punuara me dorë", tooltip: "Shikoni çmimet" },
  en: { kicker: "Prices", title: "Our Price List", note: "Handcrafted desserts", tooltip: "View prices" },
};

const PriceBubble = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const drift = Math.sin(scrollY / 180) * 14;
  const rot = Math.sin(scrollY / 260) * 4;

  const L = labels[lang] ?? labels.en;

  return (
    <div className="fixed bottom-8 right-5 md:right-8 z-40 flex flex-col items-end gap-4">
      {/* Price List Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className="w-[19rem] md:w-80 rounded-2xl shadow-2xl overflow-hidden border animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ background: "#fdf8f3", borderColor: "hsl(20 30% 20% / 0.1)" }}
        >
          {/* Header */}
          <div className="p-5 text-center" style={{ background: "hsl(var(--cocoa))" }}>
            <h3 className="font-display text-xl" style={{ color: "hsl(var(--cream))" }}>
              {L.title}
            </h3>
            <div
              className="w-12 h-0.5 mx-auto mt-2"
              style={{ background: "hsl(var(--cream) / 0.3)" }}
            />
          </div>

          {/* Items */}
          <div className="p-6 space-y-3">
            {prices.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-2"
                style={{ borderBottom: "1px solid hsl(20 30% 20% / 0.08)" }}
              >
                <span className="font-body text-sm font-medium" style={{ color: "hsl(var(--cocoa))" }}>
                  {item.name[lang] ?? item.name.en}
                </span>
                <span className="font-body text-sm font-semibold" style={{ color: "hsl(var(--cocoa))" }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 text-center" style={{ background: "hsl(20 30% 20% / 0.05)" }}>
            <span
              className="text-[10px] uppercase tracking-widest font-semibold"
              style={{ color: "hsl(20 30% 20% / 0.6)" }}
            >
              {L.note}
            </span>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={L.kicker}
        aria-expanded={open}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        style={{
          background: "hsl(var(--cocoa))",
          border: "4px solid hsl(var(--cream))",
          boxShadow: "0 10px 30px -10px hsl(20 30% 20% / 0.5), 0 0 0 4px hsl(20 30% 20% / 0.08)",
          transform: `translateY(${drift}px) rotate(${rot}deg)`,
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), scale 0.3s",
        }}
      >
        <div className="flex flex-col items-center justify-center leading-none">
          <span
            className="text-xl font-bold leading-none"
            style={{ color: "hsl(var(--cream))" }}
          >
            €
          </span>
          <span
            className="text-[9px] uppercase font-bold tracking-tighter mt-0.5"
            style={{ color: "hsl(var(--cream))" }}
          >
            {L.kicker}
          </span>
        </div>

        {/* Tooltip */}
        <div
          className="absolute right-full mr-3 px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "hsl(var(--cocoa))", color: "hsl(var(--cream))" }}
        >
          {L.tooltip}
        </div>
      </button>
    </div>
  );
};

export default PriceBubble;
