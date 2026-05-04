import { Instagram, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-pastries.jpg";
import p1 from "@/assets/pastry-1.jpg";
import p2 from "@/assets/pastry-2.jpg";
import p3 from "@/assets/pastry-3.jpg";
import p4 from "@/assets/pastry-4.jpg";
import { LanguageSwitcher, useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  const items = [
    { img: p1, name: t("menu.1.name"), desc: t("menu.1.desc") },
    { img: p2, name: t("menu.2.name"), desc: t("menu.2.desc") },
    { img: p3, name: t("menu.3.name"), desc: t("menu.3.desc") },
    { img: p4, name: t("menu.4.name"), desc: t("menu.4.desc") },
  ];

  // Parallax progress (-1 → 1) for the menu section orbs
  const menuRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = menuRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const prog = 1 - (r.top + r.height / 2) / (vh / 2 + r.height / 2);
        setP(Math.max(-1.2, Math.min(1.2, prog)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="font-display text-2xl tracking-wide text-cream">piacere</div>
        <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-cream/90">
          <a href="#menu" className="hover:text-cream transition-colors">{t("nav.menu")}</a>
          <a href="#story" className="hover:text-cream transition-colors">{t("nav.story")}</a>
          <a href="#order" className="hover:text-cream transition-colors">{t("nav.order")}</a>
        </nav>
        <div className="flex items-center gap-5">
          <LanguageSwitcher className="text-cream/90" />
          <a
            href="https://www.instagram.com/piaceresweets?igsh=MXhxZ3Awd3UzZXl0aQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="text-cream hover:text-rose transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[100vh] w-full">
        <img
          src={heroImg}
          alt="Artisan mini pastries by Piacere"
          width={1536}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/40 via-cocoa/20 to-cocoa/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="fade-in text-cream/80 text-xs uppercase tracking-[0.4em] mb-6">
            {t("hero.tag")}
          </p>
          <h1 className="fade-up font-display text-cream text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-balance max-w-5xl">
            <span className="italic font-light">{t("hero.title1")}</span> {t("hero.title2")}<br/>
            <span className="text-rose">{t("hero.title3")}</span>
          </h1>
          <p className="fade-in font-display italic text-cream/85 text-xl md:text-2xl mt-8 max-w-xl">
            {t("hero.sub")}
          </p>
          <a
            href="#order"
            className="fade-up mt-12 inline-block px-10 py-4 bg-cream text-cocoa text-xs uppercase tracking-[0.3em] hover:bg-rose transition-all duration-500 shadow-elegant"
          >
            {t("hero.cta")}
          </a>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28 md:py-40 px-6 md:px-12 bg-gradient-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-8">{t("story.kicker")}</p>
          <h2 className="font-display text-4xl md:text-6xl text-cocoa text-balance leading-tight">
            {t("story.title")}
          </h2>
          <div className="w-px h-16 bg-cocoa/30 mx-auto my-10" />
          <p className="font-body text-cocoa/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {t("story.body")}
          </p>
        </div>
      </section>

      {/* MENU */}
      <section ref={menuRef} id="menu" className="relative py-28 md:py-40 px-6 md:px-12 bg-menu overflow-hidden">
        {/* very subtle warm glow with gentle parallax + slow breath */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[50rem] h-[34rem] rounded-full bg-rose/15 blur-[110px] will-change-transform breath"
          style={{ transform: `translate3d(calc(-50% + ${p * 16}px), ${p * -30}px, 0)` }}
        />
        {/* faint grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply bg-grain" />


        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6 border-b border-terracotta/20 pb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("menu.kicker")}</p>
              <h2 className="font-display text-5xl md:text-7xl text-cocoa">{t("menu.title")}</h2>
            </div>
            <p className="font-display italic text-cocoa/70 text-xl max-w-sm md:text-right">
              {t("menu.note")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mt-16">
            {items.map((item, i) => (
              <article
                key={i}
                className="group menu-card transition-transform duration-700 ease-out hover:-translate-y-2"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <div className="relative overflow-hidden bg-cream-deep aspect-[4/5] mb-6 menu-card-frame">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="menu-img-reveal w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-cream opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                    N°0{i + 1}
                  </span>
                </div>
                <div className="relative flex items-baseline justify-between gap-4 pb-4">
                  <h3 className="font-display text-3xl md:text-4xl text-cocoa transition-colors duration-500 group-hover:text-terracotta">
                    {item.name}
                  </h3>
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-cocoa/15" />
                  <span className="menu-underline absolute left-0 bottom-0 h-px w-full bg-terracotta origin-left" />
                </div>
                <p className="font-body text-cocoa/65 text-sm mt-3 tracking-wide">{item.desc}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cocoa/40 mt-2">N°0{i + 1}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-28 md:py-40 px-6 bg-gradient-warm">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display italic text-3xl md:text-5xl text-cocoa leading-snug text-balance">
            {t("quote.text")}
          </p>
          <p className="text-xs uppercase tracking-[0.4em] text-cocoa/60 mt-10">{t("quote.by")}</p>
        </div>
      </section>

      {/* ORDER / CONTACT */}
      <section id="order" className="py-28 md:py-40 px-6 md:px-12 bg-cocoa text-cream">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-rose mb-6">{t("order.kicker")}</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight text-balance">
              {t("order.title1")} <span className="italic text-rose">piacere</span> {t("order.title2")}
            </h2>
            <p className="font-body text-cream/70 mt-8 text-lg leading-relaxed">
              {t("order.body")}
            </p>
          </div>
          <div className="space-y-6">
            <a
              href="https://www.instagram.com/piaceresweets?igsh=MXhxZ3Awd3UzZXl0aQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 p-6 border border-cream/20 hover:border-rose hover:bg-cream/5 transition-all group"
            >
              <Instagram className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">{t("order.ig")}</p>
                <p className="font-display text-2xl group-hover:text-rose transition-colors">@piaceresweets</p>
              </div>
            </a>
            <a
              href="mailto:piaceresweets@hotmail.com"
              className="flex items-center gap-5 p-6 border border-cream/20 hover:border-rose hover:bg-cream/5 transition-all group"
            >
              <Mail className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">{t("order.email")}</p>
                <p className="font-display text-2xl group-hover:text-rose transition-colors">piaceresweets@hotmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-5 p-6 border border-cream/20">
              <MapPin className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">{t("order.pickup")}</p>
                <p className="font-display text-2xl">{t("order.pickupVal")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-cocoa border-t border-cream/10 text-center">
        <p className="font-display text-3xl text-cream tracking-wide">piacere</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cream/50 mt-3">
          {t("footer.tag")}
        </p>
      </footer>
    </div>
  );
};

export default Index;
