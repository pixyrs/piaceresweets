import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "sq" | "sr";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  en: {
    "nav.menu": "Menu",
    "nav.story": "Story",
    "nav.order": "Order",
    "hero.tag": "Mini sweets · Pastry atelier",
    "hero.title1": "a little",
    "hero.title2": "pleasure,",
    "hero.title3": "handcrafted",
    "hero.sub": "Tiny, beautiful pastries baked in small batches — for moments worth savoring.",
    "hero.cta": "Place an order",
    "story.kicker": "Our story",
    "story.title": "Born from love.",
    "story.body": "Where the smallest sweets bring the greatest joy.\n\nWe create small, handmade treats that combine tradition and indulgence, because we believe happiness lies in simple, high-quality sweet moments. Each of our products is prepared with care, carefully selected ingredients, and special attention to every detail, so that every bite becomes a small moment of true joy.",
    "menu.kicker": "The menu",
    "menu.title": "Today's selection",
    "menu.note": "Rotating  - always fresh, always small batch.",
    "menu.1.name": "Donuts",
    "menu.1.desc": "Glazed mini donuts, soft and pillowy, dusted to perfection",
    "menu.2.name": "Truffle Roll",
    "menu.2.desc": "Chocolate, walnuts, soft dough",
    "menu.3.name": "Crescent bites",
    "menu.3.desc": "Espresso-soaked sponge, mascarpone, cocoa",
    "menu.4.name": "Peaches",
    "menu.4.desc": "Juicy peaches, light cream, soft sponge",
    "quote.text": "\"A sweet to slow down and taste the moment.\"",
    "quote.by": "— The Piacere kitchen",
    "order.kicker": "Order with us",
    "order.title1": "Bring a little",
    "order.title2": "to your table.",
    "order.body": " Order via Instagram DM or email — orders open Monday to Friday.",
    "order.ig": "Instagram",
    "order.email": "Email",
    "order.pickup": "Pickup",
    "order.pickupVal": "Local delivery & pickup",
    "footer.tag": "Mini sweets · Pastry atelier · © 2026",
  },
  sq: {
    "nav.menu": "Menyja",
    "nav.story": "Historia",
    "nav.order": "Porosit",
    "hero.tag": "Ëmbëlsira mini · Atelier pastiçerie",
    "hero.title1": "një kënaqësi",
    "hero.title2": "e vogël,",
    "hero.title3": "punuar me dorë",
    "hero.sub": "Ëmbëlsira të vogla e të bukura, të pjekura në sasi të vogla — për momentet që duhen shijuar.",
    "hero.cta": "Bëj porosi",
    "story.kicker": "Historia jonë",
    "story.title": "E lindur nga dashuria.",
    "story.body": "Aty ku ëmbëlsirat më të vogla sjellin gëzimin më të madh.\n\nNe krijojmë ëmbëlsira të vogla, të punuara me dorë, që ndërthurin traditën dhe shijen, sepse besojmë se lumturia gjendet në momente të thjeshta e të ëmbla cilësore. Çdo produkt ynë përgatitet me kujdes, me përbërës të zgjedhur me kujdes dhe vëmendje të veçantë ndaj çdo detaji, që çdo kafshatë të bëhet një moment i vogël gëzimi të vërtetë.",
    "menu.kicker": "Menyja",
    "menu.title": "Përzgjedhja e sotme",
    "menu.note": "Rrotative — gjithmonë të freskëta, gjithmonë në sasi të vogla.",
    "menu.1.name": "Petulla",
    "menu.1.desc": "Petulla mini të glazuara, të buta dhe të lehta, të pluhurosura në përsosmëri",
    "menu.2.name": "Rul me tartufë",
    "menu.2.desc": "Çokollatë, arra, brumë i butë",
    "menu.3.name": "Kafshime gjysmëhëne",
    "menu.3.desc": "Sfungjer i njomur me espreso, mascarpone, kakao",
    "menu.4.name": "Pjeshkë",
    "menu.4.desc": "Pjeshkë të lëngshme, krem i lehtë, sfungjer i butë",
    "quote.text": "\"Një ëmbëlsirë për të ngadalësuar dhe për të shijuar momentin.\"",
    "quote.by": "— Kuzhina Piacere",
    "order.kicker": "Porosit me ne",
    "order.title1": "Sill pak",
    "order.title2": "në tryezën tënde.",
    "order.body": " Porosit me Instagram DM ose email — porositë janë të hapura nga e hëna në të premte.",
    "order.ig": "Instagram",
    "order.email": "Email",
    "order.pickup": "Marrje",
    "order.pickupVal": "Dorëzim lokal & marrje",
    "footer.tag": "Ëmbëlsira mini · Atelier pastiçerie · © 2026",
  },
  sr: {
    "nav.menu": "Meni",
    "nav.story": "Priča",
    "nav.order": "Poruči",
    "hero.tag": "Mini slatkiši · Poslastičarski atelje",
    "hero.title1": "malo",
    "hero.title2": "zadovoljstvo,",
    "hero.title3": "ručno rađeno",
    "hero.sub": "Sitni, prelepi kolači pečeni u malim serijama — za trenutke vredne uživanja.",
    "hero.cta": "Naruči",
    "story.kicker": "Naša priča",
    "story.title": "Rođeno iz ljubavi.",
    "story.body": "Tamo gde najmanji slatkiši donose najveću radost.\n\nPravimo male, ručno rađene poslastice koje spajaju tradiciju i uživanje, jer verujemo da se sreća krije u jednostavnim, kvalitetnim slatkim trenucima. Svaki naš proizvod pripremljen je s pažnjom, pažljivo odabranim sastojcima i posebnom posvećenošću svakom detalju, kako bi svaki zalogaj postao mali trenutak istinske radosti.",
    "menu.kicker": "Meni",
    "menu.title": "Današnji izbor",
    "menu.note": "Rotirajući — uvek sveži, uvek u maloj seriji.",
    "menu.1.name": "Krofnice",
    "menu.1.desc": "Glazirane mini krofne, mekane i vazdušaste, savršeno posute",
    "menu.2.name": "Tartuf rolat",
    "menu.2.desc": "Čokolada, orasi, meko testo",
    "menu.3.name": "Polumjeseci",
    "menu.3.desc": "Polumjesečasti biskvit s mljevenim orasima i finom čokoladom",
    "menu.4.name": "Breskve",
    "menu.4.desc": "Sočne breskve, lagani krem, mekani biskvit",
    "quote.text": "\"Slatkiš da uspori i okusi trenutak.\"",
    "quote.by": "— Kuhinja Piacere",
    "order.kicker": "Poruči kod nas",
    "order.title1": "Donesi malo",
    "order.title2": "na svoj sto.",
    "order.body": " Poruči preko Instagram DM-a ili emaila — porudžbine su otvorene od ponedeljka do petka.",
    "order.ig": "Instagram",
    "order.email": "Email",
    "order.pickup": "Preuzimanje",
    "order.pickupVal": "Lokalna dostava i preuzimanje",
    "footer.tag": "Mini slatkiši · Poslastičarski atelje · © 2026",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return (saved as Lang) || "en";
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = (k: string) => translations[lang][k] ?? translations.en[k] ?? k;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};

export const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { lang, setLang } = useLang();
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "sq", label: "AL" },
    { code: "sr", label: "SR" },
  ];
  return (
    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] ${className}`}>
      {langs.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(l.code)}
            className={`transition-colors ${lang === l.code ? "text-rose" : "hover:opacity-80"}`}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
          {i < langs.length - 1 && <span className="opacity-40">/</span>}
        </span>
      ))}
    </div>
  );
};
