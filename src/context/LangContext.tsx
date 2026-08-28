import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Lang, type TranslationKey } from "@/i18n";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
};

const LangContext = createContext<LangCtx | null>(null);
const LANG_KEY = "mona_lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    // Default to Arabic if nothing is saved
    if (!saved) {
      setLangState("ar");
      localStorage.setItem(LANG_KEY, "ar");
    } else if (saved === "ar" || saved === "en") {
      setLangState(saved);
    } else {
      // Invalid saved value, reset to Arabic
      setLangState("ar");
      localStorage.setItem(LANG_KEY, "ar");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = (key: TranslationKey): string =>
    translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang outside LangProvider");
  return c;
};
