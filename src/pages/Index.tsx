import { Instagram, Mail, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-pastries.jpg";
import p1 from "@/assets/pastry-1.jpg";
import p2 from "@/assets/pastry-2.jpg";
import p3 from "@/assets/pastry-3.jpg";
import p4 from "@/assets/pastry-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="font-display text-2xl tracking-wide text-cream">piacere</div>
        <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-cream/90">
          <a href="#menu" className="hover:text-cream transition-colors">Menu</a>
          <a href="#story" className="hover:text-cream transition-colors">Story</a>
          <a href="#order" className="hover:text-cream transition-colors">Order</a>
        </nav>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-cream hover:text-rose transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
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
            Mini sweets · Pastry atelier
          </p>
          <h1 className="fade-up font-display text-cream text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-balance max-w-5xl">
            <span className="italic font-light">a little</span> pleasure,<br/>
            <span className="text-rose">handcrafted</span>
          </h1>
          <p className="fade-in font-display italic text-cream/85 text-xl md:text-2xl mt-8 max-w-xl">
            Tiny, beautiful pastries baked in small batches — for moments worth savoring.
          </p>
          <a
            href="#order"
            className="fade-up mt-12 inline-block px-10 py-4 bg-cream text-cocoa text-xs uppercase tracking-[0.3em] hover:bg-rose transition-all duration-500 shadow-elegant"
          >
            Place an order
          </a>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28 md:py-40 px-6 md:px-12 bg-gradient-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-8">Our story</p>
          <h2 className="font-display text-4xl md:text-6xl text-cocoa text-balance leading-tight">
            Born from a love <span className="italic text-terracotta"></span>.
          </h2>
          <div className="w-px h-16 bg-cocoa/30 mx-auto my-10" />
          <p className="font-body text-cocoa/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Where the smallest sweets carry the greatest joy
          </p>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-28 md:py-40 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 md:mb-24 flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-terracotta mb-4">The menu</p>
              <h2 className="font-display text-5xl md:text-7xl text-cocoa">Today's selection</h2>
            </div>
            <p className="font-display italic text-cocoa/60 text-xl max-w-sm">
              Rotating  - always fresh, always small batch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {[
              { img: p1, name: "Donuts", desc: "Glazed mini donuts, soft and pillowy, dusted to perfection", price: "\n" },
              { img: p2, name: "Truffle Roll", desc: "Chocolate, walnuts, soft dough\n", price: "\n" },
              { img: p3, name: "Crescent bites", desc: "Espresso-soaked sponge, mascarpone, cocoa", price: "\n" },
              { img: p4, name: "Choux Cream Puffs", desc: "Crisp pâte à choux, Madagascan vanilla cream", price: "\n" },
            ].map((item, i) => (
              <article key={item.name} className="group">
                <div className="overflow-hidden bg-muted aspect-[4/5] mb-6">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-cocoa/15 pb-4">
                  <h3 className="font-display text-3xl md:text-4xl text-cocoa">
                    {item.name}
                  </h3>
                  <span className="font-display italic text-2xl text-terracotta">{item.price}</span>
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
            "Sweet to slow down and taste the moment."
          </p>
          <p className="text-xs uppercase tracking-[0.4em] text-cocoa/60 mt-10">— The Piacere kitchen</p>
        </div>
      </section>

      {/* ORDER / CONTACT */}
      <section id="order" className="py-28 md:py-40 px-6 md:px-12 bg-cocoa text-cream">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-rose mb-6">Order with us</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight text-balance">
              Bring a little <span className="italic text-rose">piacere</span> to your table.
            </h2>
            <p className="font-body text-cream/70 mt-8 text-lg leading-relaxed">
              &nbsp;Order via Instagram DM or email — orders open Monday to Friday.
            </p>
          </div>
          <div className="space-y-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 p-6 border border-cream/20 hover:border-rose hover:bg-cream/5 transition-all group"
            >
              <Instagram className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Instagram</p>
                <p className="font-display text-2xl group-hover:text-rose transition-colors">@piaceresweets</p>
              </div>
            </a>
            <a
              href="mailto:piaceresweets@hotmail.com"
              className="flex items-center gap-5 p-6 border border-cream/20 hover:border-rose hover:bg-cream/5 transition-all group"
            >
              <Mail className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Email</p>
                <p className="font-display text-2xl group-hover:text-rose transition-colors">piaceresweets@hotmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-5 p-6 border border-cream/20">
              <MapPin className="w-6 h-6 text-rose" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Pickup</p>
                <p className="font-display text-2xl">Local delivery & pickup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-cocoa border-t border-cream/10 text-center">
        <p className="font-display text-3xl text-cream tracking-wide">piacere</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cream/50 mt-3">
          Mini sweets · Pastry atelier · © 2026
        </p>
      </footer>
    </div>
  );
};

export default Index;
