import { ChevronDown, Instagram, Mail, MapPin } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-pastries.jpg";
import p1 from "@/assets/pastry-1.jpg";
import p2 from "@/assets/pastry-2.jpg";
import p3 from "@/assets/pastry-3.jpg";
import p4 from "@/assets/pastry-4.jpg";
import p5 from "@/assets/walnuts.jpeg";
import p6 from "@/assets/coffee-beans.jpeg";
import { LanguageSwitcher, useLang } from "@/i18n/LanguageContext";
import BajramPopup from "@/components/BajramPopup";
import PriceBubble from "@/components/PriceBubble";


const Index = () => {
  const { t } = useLang();
  const items = [
    { img: p1, name: t("menu.1.name"), desc: t("menu.1.desc") },
    { img: p2, name: t("menu.2.name"), desc: t("menu.2.desc") },
    { img: p3, name: t("menu.3.name"), desc: t("menu.3.desc") },
    { img: p4, name: t("menu.4.name"), desc: t("menu.4.desc") },
    { img: p5, name: t("menu.5.name"), desc: t("menu.5.desc") },
    { img: p6, name: t("menu.6.name"), desc: t("menu.6.desc") },
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

  const occasions = [1, 2, 3].map((i) => ({
    title: t(`occasions.${i}.title`),
    desc: t(`occasions.${i}.desc`),
  }));
  const testimonials = [1, 2, 3].map((i) => ({
    text: t(`testimonials.${i}.text`),
    by: t(`testimonials.${i}.by`),
  }));
  const faqs = [1, 2].map((i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const menuIds = ["donuts", "truffle-roll", "crescents", "peaches", "walnuts", "coffee-beans"];
  const MIN_QTY = 10;
  const [form, setForm] = useState({ name: "", email: "", phone: "", occasion: "", date: "", message: "" });
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(menuIds.map((id) => [id, MIN_QTY])),
  );
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const bump = (id: string, delta: number) =>
    setQuantities((q) => {
      const current = q[id] || 0;
      let next: number;
      if (delta > 0) {
        next = current === 0 ? MIN_QTY : Math.min(999, current + 1);
      } else {
        next = current <= MIN_QTY ? 0 : current - 1;
      }
      return { ...q, [id]: next };
    });


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const selected = menuIds
      .map((id, i) => ({ id, name: items[i].name, quantity: quantities[id] || 0 }))
      .filter((it) => it.quantity > 0);

    if (selected.length === 0) {
      setFeedback({ kind: "error", text: t("form.itemsEmpty") });
      return;
    }

    setSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke("submit-order", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          occasion: form.occasion,
          pickup_date: form.date,
          message: form.message,
          items: selected,
        },
      });

      if (error || (data && (data as { error?: string }).error)) {
        const code = (data as { error?: string } | null)?.error;
        if (code === "rate_limited") {
          setFeedback({ kind: "error", text: t("form.errorRate") });
        } else {
          setFeedback({ kind: "error", text: t("form.errorGeneric") });
        }
      } else {
        setFeedback({ kind: "success", text: t("form.success") });
        setForm({ name: "", email: "", phone: "", occasion: "", date: "", message: "" });
        setQuantities(Object.fromEntries(menuIds.map((id) => [id, 0])));
      }
    } catch {
      setFeedback({ kind: "error", text: t("form.errorGeneric") });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BajramPopup />


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
            href="https://www.instagram.com/piaceresweets"
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

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-cocoa/10 pb-10 reveal">
            <div className="space-y-2">
              <span className="block text-terracotta text-[10px] tracking-[0.25em] font-medium uppercase">{t("menu.kicker")}</span>
              <h2 className="font-display text-5xl md:text-7xl text-cocoa font-light leading-none">
                {t("menu.title")}
              </h2>
            </div>
            <p className="mt-4 md:mt-0 font-display italic text-cocoa/60 text-lg max-w-[220px] md:text-right">
              {t("menu.note")}
            </p>
          </header>

          {/* Editorial asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 items-start">
            {items.map((item, i) => {
              const layouts = [
                { wrap: "md:col-span-7", aspect: "aspect-[4/3]" },
                { wrap: "md:col-span-4 md:col-start-9 md:mt-32", aspect: "aspect-[4/5]" },
                { wrap: "md:col-span-5 md:-mt-20", aspect: "aspect-square" },
                { wrap: "md:col-span-6 md:col-start-7", aspect: "aspect-[16/10]" },
                { wrap: "md:col-span-5 md:-mt-12", aspect: "aspect-[4/5]" },
                { wrap: "md:col-span-6 md:col-start-7 md:mt-16", aspect: "aspect-[4/5]" },
              ];
              const l = layouts[i];
              const num = `N°0${i + 1}`;
              const isLast = i === items.length - 1;
              return (
                <article
                  key={i}
                  className={`group menu-card ${l.wrap}`}
                  style={{ animationDelay: `${i * 140}ms` }}
                >
                  <div className="relative bg-cream-deep p-[1px] border border-cocoa/5 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className={`w-full ${l.aspect} object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-[1200ms] ease-out`}
                    />
                  </div>
                  {isLast ? (
                    <div className="mt-8 flex gap-10 items-start">
                      <span className="font-display italic text-terracotta text-5xl font-light leading-none opacity-25">0{i + 1}</span>

                      <div>
                        <h3 className="font-display text-2xl md:text-3xl text-cocoa mb-2">{item.name}</h3>
                        <p className="font-display italic text-cocoa/70 text-base leading-relaxed max-w-sm">{item.desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 flex justify-between items-start gap-6">
                      <div className="max-w-xs">
                        <h3 className="font-display text-2xl md:text-3xl text-cocoa mb-3">{item.name}</h3>
                        <p className="font-display italic text-cocoa/70 text-base leading-relaxed">{item.desc}</p>
                      </div>
                      <span className="font-display text-terracotta text-xs font-medium tracking-[0.25em] pt-1 shrink-0">{num}</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Atelier signature */}
          <div className="mt-32 flex flex-col items-center reveal">
            <div className="h-px w-24 bg-cocoa/15 mb-6" />
            <span className="font-body text-cocoa/40 text-[9px] tracking-[0.3em] uppercase">Atelier Menu · MMXXVI</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              href="https://www.instagram.com/piaceresweets"
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
              maxLength={40}
              placeholder={t("form.phone")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
              className="md:col-span-2 bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa transition-colors"
            />

            {/* Items selector */}
            <div className="md:col-span-2 pt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cocoa/60 mb-4">{t("form.itemsTitle")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {menuIds.map((id, i) => {
                  const qty = quantities[id] || 0;
                  return (
                    <div
                      key={id}
                      className={`flex items-center justify-between gap-3 p-3 border transition-colors ${qty > 0 ? "border-terracotta bg-rose/20" : "border-cocoa/15 bg-transparent"}`}
                    >
                      <span className="font-display text-lg text-cocoa leading-tight">{items[i].name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          aria-label="decrease"
                          onClick={() => bump(id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-cocoa/30 text-cocoa hover:bg-cocoa hover:text-cream transition-colors"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-body text-cocoa tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="increase"
                          onClick={() => bump(id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-cocoa/30 text-cocoa hover:bg-cocoa hover:text-cream transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <textarea
              maxLength={1000}
              rows={4}
              placeholder={t("form.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="md:col-span-2 bg-transparent border-b border-cocoa/20 focus:border-terracotta outline-none px-1 py-3 font-body text-cocoa placeholder:text-cocoa/40 transition-colors resize-none"
            />

            {feedback && (
              <div
                className={`md:col-span-2 p-4 text-sm font-body ${feedback.kind === "success" ? "bg-rose/30 text-cocoa border border-terracotta/40" : "bg-destructive/10 text-destructive border border-destructive/30"}`}
              >
                {feedback.text}
              </div>
            )}

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <p className="text-[11px] text-cocoa/50 font-body">{t("form.note")}</p>
              <button
                type="submit"
                disabled={submitting}
                className="px-10 py-4 bg-cocoa text-cream text-xs uppercase tracking-[0.3em] hover:bg-terracotta transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t("form.sending") : t("form.submit")}
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

      {/* STICKY MOBILE CTA */}
      <a
        href="https://www.instagram.com/piaceresweets"
        target="_blank"
        rel="noreferrer"
        className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-6 py-3.5 bg-cocoa text-cream rounded-full shadow-elegant text-[11px] uppercase tracking-[0.25em]"
      >
        <Instagram className="w-4 h-4 text-rose" />
        {t("sticky.order")}
      </a>
      <PriceBubble />
    </div>
  );
};

export default Index;
