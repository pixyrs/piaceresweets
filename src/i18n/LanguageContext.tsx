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
    "occasions.kicker": "Made for moments",
    "occasions.title": "Occasions we sweeten",
    "occasions.1.title": "Weddings",
    "occasions.1.desc": "Elegant dessert tables and favors for your big day.",
    "occasions.2.title": "Birthdays",
    "occasions.2.desc": "Personalized boxes that turn any age into a celebration.",
    "occasions.3.title": "Holidays",
    "occasions.3.desc": "Festive boxes to make every holiday a little sweeter.",
    "testimonials.kicker": "Kind words",
    "testimonials.title": "Loved by sweet tooths",
    "testimonials.1.text": "The most beautiful dessert table at our wedding — guests couldn't stop talking about it.",
    "testimonials.1.by": "— Ana & Marko",
    "testimonials.2.text": "Tiny works of art. Every bite tasted like it was made with real care.",
    "testimonials.2.by": "— Elira K.",
    "testimonials.3.text": "Ordered a corporate box — our clients were genuinely impressed. New tradition.",
    "testimonials.3.by": "— Studio Nord",
    "faq.kicker": "Good to know",
    "faq.title": "Frequently asked",
    "faq.1.q": "How far in advance should I order?",
    "faq.1.a": "We recommend ordering at least 5–7 days in advance. For weddings and larger events, please contact us a little earlier so we have enough time to prepare everything in the best possible way.",
    "faq.2.q": "Is there a minimum order?",
    "faq.2.a": "Boxes start at 12 pieces. For larger occasions, the quantity depends on your order — let us know what you'd like and we'll arrange it together.",
    "form.kicker": "Place your order",
    "form.title": "Tell us about your occasion",
    "form.name": "Your name",
    "form.email": "Email",
    "form.occasion": "Occasion",
    "form.date": "Event date",
    "form.message": "Tell us what you'd like",
    "form.submit": "Send request",
    "form.note": "Opens your email app to send the request to piaceresweets@hotmail.com",
    "sticky.order": "Order on Instagram",
    "bajram.kicker": "Eid Mubarak",
    "bajram.title": "A sweet greeting for Bajram",
    "bajram.quote": "\"May this Bajram fill your home with peace, your heart with love, and your table with sweetness.\"",
    "bajram.body": "From our kitchen to your celebration — order your festive box of mini sweets and make the holiday a little sweeter.",
    "bajram.cta": "Order your Bajram box",
    "bajram.dismiss": "Maybe later",
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
    "occasions.kicker": "Krijuar për momente",
    "occasions.title": "Rastet që ëmbëlsojmë",
    "occasions.1.title": "Dasma",
    "occasions.1.desc": "Tavolina elegante ëmbëlsirash dhe dhurata për ditën tuaj të madhe.",
    "occasions.2.title": "Ditëlindje",
    "occasions.2.desc": "Kuti të personalizuara që e kthejnë çdo moshë në festë.",
    "occasions.3.title": "Festa",
    "occasions.3.desc": "Kuti festive që e bëjnë çdo festë pak më të ëmbël.",
    "testimonials.kicker": "Fjalë të mira",
    "testimonials.title": "Të dashuruar nga të ëmblat",
    "testimonials.1.text": "Tavolina më e bukur e ëmbëlsirave në dasmën tonë — të ftuarit nuk rreshtnin së foluri.",
    "testimonials.1.by": "— Ana & Marko",
    "testimonials.2.text": "Vepra të vogla arti. Çdo kafshatë shijonte sikur ishte bërë me kujdes të vërtetë.",
    "testimonials.2.by": "— Elira K.",
    "testimonials.3.text": "Porositëm një kuti për kompaninë — klientët mbetën vërtet të impresionuar. Traditë e re.",
    "testimonials.3.by": "— Studio Nord",
    "faq.kicker": "Mirë të dihet",
    "faq.title": "Pyetje të shpeshta",
    "faq.1.q": "Sa kohë përpara duhet të porosis?",
    "faq.1.a": "Rekomandojmë të porosisni të paktën 5–7 ditë përpara. Për dasma dhe evente të mëdha, ju lutemi na kontaktoni pak më herët, që të kemi kohë të mjaftueshme për të përgatitur gjithçka në mënyrën më të mirë të mundshme.",
    "faq.2.q": "A ka porosi minimale?",
    "faq.2.a": "Kutitë fillojnë nga 12 copë. Për raste më të mëdha, sasia varet nga porosia juaj — na tregoni çfarë dëshironi dhe e organizojmë së bashku.",
    "form.kicker": "Bëj porosinë",
    "form.title": "Na trego për rastin tënd",
    "form.name": "Emri yt",
    "form.email": "Email",
    "form.occasion": "Rasti",
    "form.date": "Data e eventit",
    "form.message": "Na trego çfarë dëshiron",
    "form.submit": "Dërgo kërkesën",
    "form.note": "Hap aplikacionin e emailit për të dërguar te piaceresweets@hotmail.com",
    "sticky.order": "Porosit në Instagram",
    "bajram.kicker": "Bajrami Mubarek",
    "bajram.title": "Një përshëndetje e ëmbël për Bajram",
    "bajram.quote": "\"Bajrami i bekuar ju sjelltë paqe në shtëpi, dashuri në zemër dhe ëmbëlsi në tryezë.\"",
    "bajram.body": "Nga kuzhina jonë për festën tuaj — porosit kutinë festive me ëmbëlsira mini dhe bëje festën pak më të ëmbël.",
    "bajram.cta": "Porosit kutinë e Bajramit",
    "bajram.dismiss": "Ndoshta më vonë",
  },

  sr: {
    "nav.menu": "Meni",
    "nav.story": "Priča",
    "nav.order": "Poruči",
    "hero.tag": "Mini slatkiši · Poslastičarski atelje",
    "hero.title1": "malo",
    "hero.title2": "zadovoljstvo,",
    "hero.title3": "ručno rađeno",
    "hero.sub": "Sitni, prelepi kolači pečeni u malim serijama, za trenutke vredne uživanja.",
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
    "occasions.kicker": "Stvoreno za trenutke",
    "occasions.title": "Prilike koje zaslađujemo",
    "occasions.1.title": "Venčanja",
    "occasions.1.desc": "Elegantni slatki stolovi i pokloni za vaš veliki dan.",
    "occasions.2.title": "Rođendani",
    "occasions.2.desc": "Personalizovane kutije koje svaki uzrast pretvaraju u proslavu.",
    "occasions.3.title": "Praznici",
    "occasions.3.desc": "Prazične kutije koje svaki praznik čine malo slađim.",
    "testimonials.kicker": "Lepe reči",
    "testimonials.title": "Omiljeni među sladokuscima",
    "testimonials.1.text": "Najlepši slatki sto na našem venčanju — gosti nisu mogli da prestanu da pričaju o tome.",
    "testimonials.1.by": "— Ana & Marko",
    "testimonials.2.text": "Mala umetnička dela. Svaki zalogaj je imao ukus prave pažnje.",
    "testimonials.2.by": "— Elira K.",
    "testimonials.3.text": "Naručili smo korporativnu kutiju — klijenti su bili iskreno oduševljeni. Nova tradicija.",
    "testimonials.3.by": "— Studio Nord",
    "faq.kicker": "Dobro je znati",
    "faq.title": "Često postavljana pitanja",
    "faq.1.q": "Koliko unapred treba naručiti?",
    "faq.1.a": "Preporučujemo da porudžbinu napravite najmanje 5–7 dana unapred. Za venčanja i veće događaje, molimo Vas da nas kontaktirate nešto ranije, kako bismo imali dovoljno vremena da sve pripremimo na najbolji mogući način.",
    "faq.2.q": "Postoji li minimalna porudžbina?",
    "faq.2.a": "Kutije počinju od 12 komada, a za veće prilike količina zavisi od Vaše porudžbine — javite nam šta želite i sve dogovaramo zajedno.",
    "form.kicker": "Naručite",
    "form.title": "Recite nam o vašoj prilici",
    "form.name": "Vaše ime",
    "form.email": "Email",
    "form.occasion": "Prilika",
    "form.date": "Datum događaja",
    "form.message": "Recite nam šta želite",
    "form.submit": "Pošalji zahtev",
    "form.note": "Otvara vaš mejl program da pošalje zahtev na piaceresweets@hotmail.com",
    "sticky.order": "Naruči na Instagramu",
    "bajram.kicker": "Bajram Mubarek",
    "bajram.title": "Slatki pozdrav za Bajram",
    "bajram.quote": "\"Neka ovaj Bajram ispuni vaš dom mirom, srce ljubavlju, a sto slatkoćom.\"",
    "bajram.body": "Iz naše kuhinje za vašu proslavu — naručite svečanu kutiju mini slatkiša i učinite praznik malo slađim.",
    "bajram.cta": "Naruči Bajramsku kutiju",
    "bajram.dismiss": "Možda kasnije",
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
