import { ChevronDown, Instagram, Mail, MapPin } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
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

  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const occasions = [1, 2, 3, 4].map((i) => ({
    title: t(`occasions.${i}.title`),
    desc: t(`occasions.${i}.desc`),
  }));
  const testimonials = [1, 2, 3].map((i) => ({
    text: t(`testimonials.${i}.text`),
    by: t(`testimonials.${i}.by`),
  }));
  const faqs = [1, 2, 3, 4].map((i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [form, setForm] = useState({ name: "", email: "", occasion: "", date: "", message: "" });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Order request — ${form.occasion || "Piacere"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOccasion: ${form.occasion}\nDate: ${form.date}\n\n${form.message}`,
    );
    window.location.href = `mailto:piaceresweets@hotmail.com?subject=${subject}&body=${body}`;
  };

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
        {/* warm washes top & bottom for seamless blend */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-deep to-transparent" />

        {/* singular warm glow, gentle parallax */}
        <div
          className="pointer-events-none absolute -top-48 left-1/2 w-[60rem] h-[40rem] rounded-full bg-rose/25 blur-[120px] will-change-transform"
          style={{ transform: `translate3d(calc(-50% + ${p * 20}px), ${p * -40}px, 0)` }}
        />

        {/* paper texture + grain */}
        <div className="pointer-events-none absolute inset-0 bg-paper opacity-60" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply bg-grain" />

        {/* hairline editorial frame */}
        <div className="pointer-events-none absolute inset-6 md:inset-10 border border-cocoa/10" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 md:mb-24 flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("menu.kicker")}</p>
              <h2 className="font-display text-5xl md:text-7xl text-cocoa">{t("menu.title")}</h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-terracotta to-transparent" />
            </div>
            <p className="font-display italic text-cocoa/60 text-xl max-w-sm">
              {t("menu.note")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {items.map((item, i) => (
              <article
                key={i}
                className="group menu-card"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <div className="relative overflow-hidden bg-muted aspect-[4/5] mb-6 shadow-elegant">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-cream opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                    N°0{i + 1}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-cocoa/15 pb-4 transition-colors duration-500 group-hover:border-rose">
                  <h3 className="font-display text-3xl md:text-4xl text-cocoa transition-colors duration-500 group-hover:text-rose">
                    {item.name}
                  </h3>
                </div>
                <p className="font-body text-cocoa/65 text-sm mt-3 tracking-wide">{item.desc}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cocoa/40 mt-2">N°0{i + 1}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-cream-deep">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("occasions.kicker")}</p>
            <h2 className="font-display text-4xl md:text-6xl text-cocoa text-balance">{t("occasions.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((o, i) => (
              <div
                key={i}
                className="reveal group p-8 bg-cream border border-cocoa/10 hover:border-rose hover:shadow-elegant transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-display italic text-terracotta text-sm mb-3">N°0{i + 1}</div>
                <h3 className="font-display text-3xl text-cocoa mb-3 group-hover:text-rose transition-colors">{o.title}</h3>
                <p className="font-body text-cocoa/70 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-gradient-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("testimonials.kicker")}</p>
            <h2 className="font-display text-4xl md:text-6xl text-cocoa text-balance">{t("testimonials.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((tm, i) => (
              <figure
                key={i}
                className="reveal relative p-10 bg-cream border border-cocoa/10 shadow-soft"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="absolute -top-6 left-8 font-display text-7xl text-terracotta/40 leading-none">"</span>
                <blockquote className="font-display italic text-cocoa text-xl leading-relaxed">{tm.text}</blockquote>
                <figcaption className="text-[11px] uppercase tracking-[0.3em] text-cocoa/60 mt-6">{tm.by}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>


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

      {/* ORDER FORM */}
      <section id="request" className="py-28 md:py-36 px-6 md:px-12 bg-gradient-warm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("form.kicker")}</p>
            <h2 className="font-display text-4xl md:text-5xl text-cocoa text-balance">{t("form.title")}</h2>
          </div>
          <form onSubmit={onSubmit} className="reveal grid grid-cols-1 md:grid-cols-2 gap-5 bg-cream p-8 md:p-10 border border-cocoa/10 shadow-soft">
            <input
              required
              maxLength={100}
              placeholder={t("form.name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa placeholder:text-cocoa/40 transition-colors"
            />
            <input
              required
              type="email"
              maxLength={255}
              placeholder={t("form.email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa placeholder:text-cocoa/40 transition-colors"
            />
            <input
              maxLength={100}
              placeholder={t("form.occasion")}
              value={form.occasion}
              onChange={(e) => setForm({ ...form, occasion: e.target.value })}
              className="bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa placeholder:text-cocoa/40 transition-colors"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa transition-colors"
            />
            <textarea
              required
              maxLength={1000}
              rows={4}
              placeholder={t("form.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa placeholder:text-cocoa/40 transition-colors resize-none"
            />
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <p className="text-[11px] text-cocoa/50 font-body">{t("form.note")}</p>
              <button
                type="submit"
                className="px-10 py-4 bg-cocoa text-cream text-xs uppercase tracking-[0.3em] hover:bg-terracotta transition-colors duration-500"
              >
                {t("form.submit")}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">{t("faq.kicker")}</p>
            <h2 className="font-display text-4xl md:text-5xl text-cocoa text-balance">{t("faq.title")}</h2>
          </div>
          <div className="divide-y divide-cocoa/15 border-y border-cocoa/15">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl md:text-2xl text-cocoa group-hover:text-terracotta transition-colors">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cocoa/60 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden font-body text-cocoa/75 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              );
            })}
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
