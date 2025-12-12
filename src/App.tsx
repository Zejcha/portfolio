import React, { useState, useEffect } from 'react';
import { 
  Github, Mail, Menu, X, ArrowUp, Plus, Languages, Shield, 
  Copy, Check, ExternalLink, ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPY I INTERFEJSY ---

type Language = 'pl' | 'en';

interface LocalizedText {
  pl: string;
  en: string;
}

interface Project {
  id: number;
  title: string | LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  tech: string[];
  link: string;
  repo: string;
  imageUrl?: string; 
  isPlaceholder?: boolean;
}

// --- FUNKCJA NAPRAWIAJĄCA ŚCIEŻKI (FIX DLA GITHUB PAGES) ---
// Ta funkcja zapewnia poprawne ścieżki do obrazków niezależnie od tego,
// czy jesteś na localhost, czy na https://zejcha.github.io/portfolio/
const resolvePath = (path: string) => {
  // Usuwamy początkowy slash z path, jeśli istnieje, aby uniknąć podwójnych //
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Domyślna baza, zgodna z konfiguracją w vite.config.ts
  let baseUrl = '/portfolio/';

  // Próba bezpiecznego pobrania BASE_URL z Vite (import.meta.env)
  // Używamy try-catch i sprawdzeń typu, aby uniknąć błędów w środowiskach ES2015
  try {
    // @ts-ignore - ignorujemy błędy TS dla import.meta w starszych targetach
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
      // @ts-ignore
      baseUrl = import.meta.env.BASE_URL;
    }
  } catch (e) {
    // W razie błędu zostajemy przy domyślnym '/portfolio/'
    console.warn('Could not load import.meta.env.BASE_URL, using fallback.');
  }

  // Jeśli baseUrl kończy się slashem, łączymy bezpośrednio, jeśli nie - dodajemy go
  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${cleanPath}`;
  }
  return `${baseUrl}/${cleanPath}`;
};

// --- SŁOWNIK TŁUMACZEŃ INTERFEJSU ---
const translations = {
  pl: {
    nav_projects: "Projekty",
    nav_contact: "Kontakt",
    hero_badge: "Frontend Developer",
    hero_title_1: "Cześć, jestem",
    hero_title_2: "Dominik.",
    hero_slogans: [
      "Tworzę responsywne i nowoczesne strony internetowe.",
      "Szukam możliwości rozwoju jako Junior Developer.",
      "Pasjonuję się frontendem i nowymi technologiami.",
    ],
    hero_btn_projects: "Zobacz moje projekty",
    projects_title: "Moje Projekty",
    projects_subtitle: "Poniżej znajduje się wybór stron i aplikacji, które stworzyłem.",
    projects_hover_hint: "Najedź, aby zobaczyć zdjęcie",
    footer_title: "Porozmawiajmy!",
    footer_desc: "Jestem otwarty na nowe możliwości – staż, praktyki lub stanowisko juniorskie. Chętnie poznam Twój zespół!",
    footer_btn_mail: "Napisz do mnie",
    footer_copyright: "Dominik P. Portfolio.",
    other_projects_title: "I wiele innych...",
    other_projects_desc: "Mam również doświadczenie z mniejszymi projektami i eksperymentami z nowymi technologiami.",
    other_projects_link: "Skontaktuj się",
    privacy_link: "Polityka Prywatności",
    privacy_title: "Polityka Prywatności",
    privacy_close: "Zamknij",
    contact_modal_title: "Kontakt",
    contact_modal_desc: "Chcesz porozmawiać o współpracy lub masz pytania? Śmiało napisz!",
    contact_modal_copy_hint: "Kliknij, aby skopiować",
    contact_modal_copied: "Skopiowano!",
    contact_email: "dpdominik@int.pl",
    
    privacy_content: `
      1. Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych pozyskanych za pośrednictwem strony internetowej (zwanej dalej: „Stroną internetową”).
      2. Właścicielem strony i jednocześnie Administratorem danych jest Dominik P. (kontakt: dpdominik@int.pl), zwany dalej Administratorem.
      3. Dane osobowe zbierane przez Administratora za pośrednictwem Strony internetowej są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).
      4. Administrator dokłada szczególnej staranności do poszanowania prywatności osób odwiedzających Stronę internetową.

      § 1 Rodzaj przetwarzanych danych, cele oraz podstawa prawna
      1. Administrator zbiera informacje dotyczące osób fizycznych.
      2. Dane osobowe są zbierane w przypadku kontaktu drogą elektroniczną (e-mail) w celu udzielenia odpowiedzi na przesłaną wiadomość.
      3. W przypadku kontaktu podawane są następujące dane: adres e-mail, ewentualnie imię i inne dane zawarte w treści wiadomości.
      4. Podczas korzystania ze Strony internetowej mogą być pobierane dodatkowe informacje: adres IP, rodzaj przeglądarki, czas dostępu, typ systemu operacyjnego.
      5. Przekazanie danych osobowych do Administratora jest dobrowolne.

      § 2 Komu udostępniane lub powierzane są dane?
      1. Dane osobowe mogą być przekazywane dostawcom usług (np. hosting GitHub Pages).
      2. Dane osobowe przechowywane są przez okres niezbędny do realizacji kontaktu.
      3. W przypadku skierowania żądania Administrator udostępnia dane uprawnionym organom państwowym.

      § 3 Mechanizm cookies, adres IP
      1. Strona internetowa używa niewielkich plików cookies.
      2. Administrator wykorzystuje cookies własne w celu analiz statystycznych i poprawy funkcjonalności strony.
      3. Mechanizm cookies jest bezpieczny dla komputerów użytkowników.
      4. Administrator może gromadzić adresy IP w celach technicznych.

      § 4 Prawa osób, których dane dotyczą
      1. Użytkownik ma prawo do cofnięcia zgody, sprzeciwu, usunięcia danych, ograniczenia przetwarzania, dostępu do danych oraz ich sprostowania.
      2. W celu realizacji praw należy skontaktować się z Administratorem.
      3. Użytkownikowi przysługuje prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.

      § 5 Zmiany Polityki Prywatności
      1. Polityka Prywatności może ulec zmianie.
      2. Pytania prosimy kierować na adres: dpdominik@int.pl
      3. Data ostatniej modyfikacji: 12.12.2025
    `
  },
  en: {
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_badge: "Frontend Developer",
    hero_title_1: "Hi, I'm",
    hero_title_2: "Dominik.",
    hero_slogans: [
      "I build responsive and modern websites.",
      "Looking for opportunities as a Junior Developer.",
      "Passionate about frontend and new technologies.",
    ],
    hero_btn_projects: "See my projects",
    projects_title: "My Projects",
    projects_subtitle: "Below is a selection of websites and apps I've created.",
    projects_hover_hint: "Hover to view image",
    footer_title: "Let's talk!",
    footer_desc: "I'm open to new opportunities – internship, apprenticeship, or junior position. I'd love to meet your team!",
    footer_btn_mail: "Email me",
    footer_copyright: "Dominik P. Portfolio.",
    other_projects_title: "And many more...",
    other_projects_desc: "I also have experience with smaller projects, landing pages, and experiments with new technologies.",
    other_projects_link: "Get in touch",
    privacy_link: "Privacy Policy",
    privacy_title: "Privacy Policy",
    privacy_close: "Close",
    contact_modal_title: "Contact",
    contact_modal_desc: "Want to discuss collaboration or have questions? Feel free to reach out!",
    contact_modal_copy_hint: "Click to copy",
    contact_modal_copied: "Copied!",
    contact_email: "dpdominik@int.pl",

    privacy_content: `
      1. This Privacy Policy sets out the rules for data processing on the Website.
      2. The Data Controller is Dominik P. (contact: dpdominik@int.pl).
      3. Personal data is processed in accordance with GDPR.
      
      § 1 Type of data processed
      1. Data is collected when contacting via email to respond to the message.
      2. Data collected: email address, potentially name and other data included in the message body.
      3. Additional technical data: IP address, browser type.
      
      § 2 Data sharing
      1. Data may be shared with service providers (e.g. GitHub Pages).
      2. Data is stored for the period necessary to maintain contact.
      
      § 3 Cookies
      1. The website uses small cookie files for statistical analysis.
      2. Cookies are safe for the user's device.
      
      § 4 User Rights
      1. You have the right to access, rectify, delete, or restrict processing of your data.
      2. You have the right to lodge a complaint with the supervisory authority.
      
      § 5 Changes
      1. The policy may change.
      2. Contact: dpdominik@int.pl
      3. Last modified: 12.12.2025
    `
  }
};

const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false); 
  const [lang, setLang] = useState<Language>('pl');
  
  const [sloganIndex, setSloganIndex] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [typedName, setTypedName] = useState<string>('');
  const [showCursor, setShowCursor] = useState<boolean>(true);

  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % t.hero_slogans.length);
    }, 3500); 
    return () => clearInterval(interval);
  }, [t.hero_slogans.length]);

  useEffect(() => {
    const fullName = t.hero_title_2;
    setTypedName('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setTypedName(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, [t.hero_title_2]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Blokada F12 i skrótów deweloperskich (opcjonalne, może irytować użytkowników)
      if (e.key === 'F12' || 
         (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
         (e.ctrlKey && e.key === 'u')) {
        // e.preventDefault(); // Odkomentuj jeśli chcesz blokować
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (privacyOpen || contactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [privacyOpen, contactOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'pl' ? 'en' : 'pl');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(t.contact_email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Ważka Usługi Budowlane",
      category: { pl: "Strona Firmowa", en: "Corporate Website" },
      description: {
        pl: "Profesjonalna wizytówka online dla firmy budowlanej. Nacisk na prezentację realizacji i ofertę.",
        en: "Professional online business card for a construction company."
      },
      tech: ["WordPress", "RWD", "SEO"],
      link: "https://wazkauslugibudowlane.pl",
      repo: "#",
      imageUrl: resolvePath("projects/wazka.jpg")
    },
    {
      id: 2,
      title: "VIP GSM",
      category: { pl: "Serwis & Sklep", en: "Service & Shop" },
      description: {
        pl: "Strona dla serwisu telefonów komórkowych z katalogiem usług i akcesoriów.",
        en: "Website for a mobile phone service point."
      },
      tech: ["HTML5", "CSS3", "JavaScript"],
      link: "https://vip-gsm.pl",
      repo: "#",
      imageUrl: resolvePath("projects/vip-gsm.jpg")
    },
    {
      id: 3,
      title: "Party Wave",
      category: { pl: "Eventy", en: "Events" },
      description: {
        pl: "Nowoczesna strona agencji eventowej. Dynamiczny design.",
        en: "Modern website for an event agency."
      },
      tech: ["React", "Framer Motion", "Tailwind"],
      link: "https://partywave.pl",
      repo: "#",
      imageUrl: resolvePath("projects/partywave.jpg")
    },
    {
      id: 4,
      title: "Miodowa Pasieka",
      category: { pl: "E-commerce", en: "E-commerce" },
      description: {
        pl: "Sklep internetowy z naturalnymi miodami.",
        en: "Online store with natural honey."
      },
      tech: ["WooCommerce", "PHP", "MySQL"],
      link: "https://miodowapasieka.pl",
      repo: "#",
      imageUrl: resolvePath("projects/miodowapasieka.jpg")
    },
    {
      id: 5,
      title: "Miody Słowik",
      category: { pl: "Sklep Online", en: "Online Shop" },
      description: {
        pl: "Rodzinna manufaktura miodu.",
        en: "Family honey manufactory."
      },
      tech: ["WordPress", "Elementor", "CSS3"],
      link: "https://miodyslowik.pl",
      repo: "#",
      imageUrl: resolvePath("projects/miodyslowik.jpg")
    },
    {
      id: 6,
      title: "Dobranoc Maluszku",
      category: { pl: "Blog & Sklep", en: "Blog & Shop" },
      description: {
        pl: "Portal parentingowy połączony ze sklepem.",
        en: "Parenting portal combined with a shop."
      },
      tech: ["CMS", "RWD", "Analytics"],
      link: "https://dobranocmaluszku.pl",
      repo: "#",
      imageUrl: resolvePath("projects/dobranocmaluszku.jpg")
    },
    {
      id: 7,
      title: "E-Aristo",
      category: { pl: "E-commerce", en: "E-commerce" },
      description: {
        pl: "Platforma sprzedażowa z szerokim asortymentem.",
        en: "Sales platform with a wide assortment."
      },
      tech: ["PrestaShop", "PHP", "Bootstrap"],
      link: "https://e-aristo.pl",
      repo: "#",
      imageUrl: resolvePath("projects/e-aristo.jpg")
    },
    {
      id: 8,
      title: "Maro Oleje",
      category: { pl: "B2B / Przemysł", en: "B2B / Industry" },
      description: {
        pl: "Katalog produktów dla dystrybutora olejów przemysłowych.",
        en: "Product catalog for an industrial oil distributor."
      },
      tech: ["HTML5", "Sass", "jQuery"],
      link: "https://marooleje.com",
      repo: "#",
      imageUrl: resolvePath("projects/marooleje.jpg")
    },
    {
      id: 9,
      title: "Thai Vege",
      category: { pl: "Gastronomia", en: "Gastronomy" },
      description: {
        pl: "Strona restauracji z menu online.",
        en: "Restaurant website with online menu."
      },
      tech: ["WordPress", "Restaurant Plugin", "CSS"],
      link: "https://thaivege.pl",
      repo: "#",
      imageUrl: resolvePath("projects/thaivege.jpg")
    },
    {
      id: 10,
      title: "Chilli Mili",
      category: { pl: "Gastronomia", en: "Gastronomy" },
      description: {
        pl: "Wizytówka lokalu gastronomicznego.",
        en: "Restaurant business card."
      },
      tech: ["React", "Styled Components", "Maps API"],
      link: "https://chillimili.pl",
      repo: "#",
      imageUrl: resolvePath("projects/chillimili.jpg")
    },
    {
      id: 11,
      title: "Stol-Past",
      category: { pl: "Usługi Stolarskie", en: "Carpentry Services" },
      description: {
        pl: "Portfolio pracowni stolarskiej.",
        en: "Carpentry workshop portfolio."
      },
      tech: ["HTML5", "LightGallery.js", "PHP Mailer"],
      link: "https://stol-past.pl",
      repo: "#",
      imageUrl: resolvePath("projects/stol-past.jpg")
    },
    {
      id: 12,
      title: "Mazurski Plon",
      category: { pl: "Rolnictwo", en: "Agriculture" },
      description: {
        pl: "Strona promująca lokalne produkty rolne.",
        en: "Website promoting local agricultural products."
      },
      tech: ["WordPress", "RWD", "SEO"],
      link: "https://mazurski-plon.pl",
      repo: "#",
      imageUrl: resolvePath("projects/mazurski-plon.jpg")
    },
    {
      id: 13,
      title: "Lengyel Magyar",
      category: { pl: "Kultura", en: "Culture" },
      description: {
        pl: "Portal poświęcony współpracy polsko-węgierskiej.",
        en: "Portal dedicated to Polish-Hungarian cooperation."
      },
      tech: ["CMS", "Multi-language", "CSS3"],
      link: "https://lengyelmagyar.eu",
      repo: "#",
      imageUrl: resolvePath("projects/lengyelmagyar.jpg")
    },
    {
      id: 14,
      title: "Knotologicznie",
      category: { pl: "Rękodzieło", en: "Handicraft" },
      description: {
        pl: "Sklep z rękodziełem (świece, makrama).",
        en: "Handicraft shop (candles, macrame)."
      },
      tech: ["WooCommerce", "Instagram Feed", "CSS"],
      link: "https://knotologicznie.pl",
      repo: "#",
      imageUrl: resolvePath("projects/knotologicznie.jpg")
    },
    {
      id: 15,
      title: "Kazana Ubezpiecza",
      category: { pl: "Finanse", en: "Finance" },
      description: {
        pl: "Profesjonalna strona agenta ubezpieczeniowego.",
        en: "Professional insurance agent website."
      },
      tech: ["WordPress", "JS Forms", "Bootstrap"],
      link: "https://kazanaubezpiecza.pl",
      repo: "#",
      imageUrl: resolvePath("projects/kazana.jpg")
    },
    {
      id: 16,
      title: "Pasieka u Andrzeja",
      category: { pl: "Produktowa", en: "Product Site" },
      description: {
        pl: "Wizytówka lokalnej pasieki.",
        en: "Local apiary business card."
      },
      tech: ["HTML5", "CSS3", "JavaScript"],
      link: "https://pasiekauandrzeja.pl",
      repo: "#",
      imageUrl: resolvePath("projects/pasiekauandrzeja.jpg")
    },
    {
      id: 17,
      title: "Ewix",
      category: { pl: "Usługi (Holandia)", en: "Services (NL)" },
      description: {
        pl: "Strona firmy usługowej działającej na rynku holenderskim.",
        en: "Website of a service company operating in the Dutch market."
      },
      tech: ["React", "i18next", "Tailwind"],
      link: "https://ewix.nl",
      repo: "#",
      imageUrl: resolvePath("projects/ewix.jpg")
    },
    {
      id: 18,
      title: "Silveroon",
      category: { pl: "Jubiler", en: "Jeweler" },
      description: {
        pl: "Ekskluzywny sklep z biżuterią.",
        en: "Exclusive jewelry store."
      },
      tech: ["E-commerce", "UX/UI Design", "SEO"],
      link: "https://silveroon.com",
      repo: "#",
      imageUrl: resolvePath("projects/silveroon.jpg")
    },
    {
      id: 19,
      title: { pl: "I wiele innych...", en: "And many more..." },
      category: { pl: "Pozostałe Projekty", en: "Other Projects" },
      description: {
        pl: "Mam również doświadczenie z mniejszymi projektami, landing page'ami i eksperymentami z nowymi technologiami.",
        en: "I also have experience with smaller projects, landing pages, and experiments with new technologies."
      },
      tech: ["More coming soon", "..."],
      link: "#kontakt",
      repo: "#",
      isPlaceholder: true
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      
      {/* TŁO ANIMOWANE */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer"
            onClick={scrollToTop}
          >
            <img src={resolvePath("logo.png")} alt="Logo" className="h-10 w-auto" />
          </motion.div>

          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <motion.a 
               href="#projekty" 
               onClick={(e) => handleSmoothScroll(e, 'projekty')}
               className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.nav_projects}
            </motion.a>
            <motion.a 
               href="#kontakt" 
               onClick={(e) => { e.preventDefault(); setContactOpen(true); }}
               className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.nav_contact}
            </motion.a>

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs uppercase font-bold tracking-wider"
            >
              <Languages size={14} />
              {lang}
            </button>
          </div>

          <div className="md:hidden z-50 flex items-center gap-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase font-bold tracking-wider"
            >
              {lang}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
            >
              <a href="#projekty" onClick={(e) => handleSmoothScroll(e, 'projekty')} className="text-2xl font-bold text-white hover:text-cyan-400">{t.nav_projects}</a>
              <a href="#kontakt" onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }} className="text-2xl font-bold text-white hover:text-cyan-400">{t.nav_contact}</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <div className="max-w-4xl space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-4 backdrop-blur-sm"
          >
            {t.hero_badge}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
             <motion.img 
               src={resolvePath("logo.png")}
               alt="Logo" 
               className="h-48 w-auto"
               animate={{ 
                 scale: [1, 1.05, 1], 
                 filter: [
                   "drop-shadow(0 0 0px rgba(34, 211, 238, 0))", 
                   "drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))", 
                   "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"
                 ] 
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            {t.hero_title_1} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              {typedName}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            </span>
          </motion.h1>

          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={sloganIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              >
                {t.hero_slogans[sloganIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <a 
              href="#projekty" 
              onClick={(e) => handleSmoothScroll(e, 'projekty')}
              className="group relative px-8 py-3 rounded-xl bg-cyan-600 text-white font-semibold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-in-out -translate-x-full"></span>
              <span className="relative">{t.hero_btn_projects}</span>
            </a>
            
            <a href="https://github.com/Zejcha" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2">
              <Github size={20} /> GitHub
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-slate-500 cursor-pointer"
          onClick={(e) => {
            handleSmoothScroll(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'projekty');
          }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* SEKCJA PROJEKTY */}
      <section id="projekty" className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.projects_title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            <p className="mt-4 text-slate-400 max-w-2xl">
              {t.projects_subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                
                className={`group relative ${project.isPlaceholder ? 'h-[250px] md:h-[400px] flex items-center justify-center' : 'h-[400px]'}`}
              >
                {/* Efekt poświaty */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 ${project.isPlaceholder ? 'opacity-20' : 'group-hover:opacity-50'} transition duration-500 blur-md`}></div>
                
                {/* Karta Projektu */}
                <div className={`relative w-full h-full flex flex-col rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 ${!project.isPlaceholder && 'group-hover:scale-[1.02]'}`}>
                  
                  {project.isPlaceholder ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-cyan-400">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{typeof project.title === 'object' ? project.title[lang] : project.title}</h3>
                        <p className="text-slate-400 text-sm">{project.description[lang]}</p>
                        <a href="#kontakt" onClick={(e) => { e.preventDefault(); setContactOpen(true); }} className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer">
                            {t.other_projects_link} <ExternalLink size={14}/>
                        </a>
                    </div>
                  ) : (
                    <>
                        <AnimatePresence>
                            {project.imageUrl && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 z-20 bg-slate-900 overflow-hidden"
                            >
                                <img 
                                  src={project.imageUrl} 
                                  alt={`Podgląd ${typeof project.title === 'string' ? project.title : project.title[lang]}`}
                                  className="w-full h-full object-cover object-top group-hover:object-bottom transition-all duration-[5000ms] ease-in-out opacity-80 group-hover:opacity-100 transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 group-hover:opacity-0 transition-opacity duration-500"></div>
                            </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-col h-full p-8 relative z-30 pointer-events-none">
                            <div className="flex justify-between items-start mb-4 pointer-events-auto">
                              <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase bg-slate-950/90 px-3 py-1.5 rounded-lg border border-cyan-500/30 truncate max-w-[60%] backdrop-blur-md shadow-xl group-hover:opacity-0 transition-opacity duration-300" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>
                                  {project.category[lang]}
                              </span>
                              
                              <div className="flex gap-3 z-40">
                                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors p-1 hover:bg-slate-800/80 rounded-full backdrop-blur-sm" title="Pokaż stronę"><ExternalLink size={20}/></a>
                              </div>
                            </div>
                            
                            <div className="mt-auto pointer-events-auto group-hover:opacity-0 transition-opacity duration-300">
                              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors truncate" style={{textShadow: '0 2px 4px rgba(0,0,0,0.9)'}}>
                                {typeof project.title === 'object' ? project.title[lang] : project.title}
                              </h3>
                              
                              <p className="text-slate-200 leading-relaxed mb-6 line-clamp-3 text-sm" style={{textShadow: '0 1px 3px rgba(0,0,0,0.8)'}}>
                                {project.description[lang]}
                              </p>

                              <div className="flex flex-wrap gap-2 pt-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1.5 text-xs rounded-full bg-slate-950/90 border border-white/20 text-slate-100 shadow-lg backdrop-blur-md font-medium">
                                    {t}
                                    </span>
                                ))}
                              </div>
                            </div>
                        </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontakt" className="relative z-10 py-20 px-4 border-t border-white/5 bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{t.footer_title}</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {t.footer_desc}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button 
              onClick={() => setContactOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all text-white shadow-lg shadow-cyan-900/20"
            >
              <Mail size={18} /> {t.footer_btn_mail}
            </button>
          </div>

          <div className="text-slate-600 text-sm flex flex-col md:flex-row items-center justify-center gap-4">
            <span>&copy; {new Date().getFullYear()} {t.footer_copyright}</span>
            <button 
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-cyan-400 transition-colors underline decoration-slate-600 underline-offset-4"
            >
              {t.privacy_link}
            </button>
          </div>
        </motion.div>
      </footer>

      {/* MODAL POLITYKI PRYWATNOŚCI */}
      <AnimatePresence>
        {privacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setPrivacyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 md:p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setPrivacyOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-6 text-cyan-400">
                <Shield size={32} />
                <h2 className="text-2xl font-bold text-white">{t.privacy_title}</h2>
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-line leading-relaxed">
                {t.privacy_content}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setPrivacyOpen(false)}
                  className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
                >
                  {t.privacy_close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL KONTAKTOWY */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <button 
                onClick={() => setContactOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mail size={32} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">{t.contact_modal_title}</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                {t.contact_modal_desc}
              </p>

              {/* EMAIL COPY BOX */}
              <button 
                onClick={copyToClipboard}
                className="group w-full bg-slate-900 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all relative overflow-hidden"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs text-slate-500 mb-1">{t.contact_modal_copy_hint}</span>
                  <span className="text-white font-mono text-lg">{t.contact_email}</span>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${isCopied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                  {isCopied ? <Check size={20} /> : <Copy size={20} />}
                </div>

                {/* Pulse animation bg */}
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>

              <AnimatePresence>
                {isCopied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
                  >
                    <span className="bg-green-500/90 text-white text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                      {t.contact_modal_copied}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            {/* Scroll Button */}
            <button
                onClick={scrollToTop}
                className="p-3 rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-900/50 hover:bg-cyan-500 transition-colors border border-white/10 group"
            >
                <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;