import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
  sr: { kicker: "Cenovnik", title: "Mini slatkiši", note: "Cena po komadu" },
  sq: { kicker: "Çmimorja", title: "Ëmbëlsira mini", note: "Çmimi për copë" },
  en: { kicker: "Price list", title: "Mini sweets", note: "Price per piece" },
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

  // gentle drift based on scroll position
  const drift = Math.sin(scrollY / 180) * 14;
  const rot = Math.sin(scrollY / 260) * 6;

  const L = labels[lang] ?? labels.en;

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={L.kicker}
        className="fixed right-5 md:right-8 bottom-24 md:bottom-10 z-40 group"
        style={{
          transform: `translateY(${drift}px) rotate(${rot}deg)`,
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full blur-2xl opacity-60 bg-[radial-gradient(circle_at_30%_30%,hsl(20_55%_35%/0.7),transparent_70%)]" />
        <span className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full overflow-hidden shadow-elegant border border-cream/20 chocolate-bubble">
          {/* glossy highlight */}
          <span className="absolute top-2 left-3 h-5 w-7 rounded-full bg-cream/40 blur-[2px] rotate-[-20deg]" />
          <span className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-cocoa/60 blur-md" />
          {/* drip */}
          <span className="absolute -bottom-1 left-1/3 h-3 w-2 rounded-b-full chocolate-bubble" />
          <span className="relative font-display italic text-cream text-center leading-none">
            <span className="block text-[9px] uppercase tracking-[0.3em] not-italic font-body text-cream/80 mb-0.5">
              {L.kicker}
            </span>
            <span className="block text-xl md:text-2xl">€</span>
          </span>
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center px-5 py-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-cocoa/70 backdrop-blur-sm animate-in fade-in duration-300"
          />
          <div className="relative w-full max-w-md overflow-hidden border border-cream/10 shadow-elegant chocolate-card animate-in fade-in zoom-in-95 duration-500">
            {/* glossy chocolate shimmer */}
            <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,hsl(36_45%_75%/0.25),transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,hsl(14_55%_40%/0.35),transparent_70%)]" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 p-2 text-cream/70 hover:text-cream transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative px-8 md:px-10 py-10 md:py-12 text-center text-cream">
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold mb-4">{L.kicker}</p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                {L.title}
              </h2>
              <div className="mx-auto mt-5 h-px w-16 bg-gold/50" />

              <ul className="mt-8 space-y-3.5 text-left">
                {prices.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span className="font-display text-lg md:text-xl text-cream whitespace-nowrap">
                      {item.name[lang] ?? item.name.en}
                    </span>
                    <span
                      className="flex-1 mt-2 border-b border-dotted border-cream/30"
                      aria-hidden
                    />
                    <span className="font-display text-lg md:text-xl text-gold whitespace-nowrap">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-cream/60">
                {L.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceBubble;
