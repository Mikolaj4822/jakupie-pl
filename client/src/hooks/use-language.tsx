import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import { polishTexts, getExactTranslation } from "@/lib/translation-fixer";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const LANGUAGE_KEY = "buyads-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    // Try to get language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
      return savedLanguage || "pl"; // Default to Polish
    }
    return "pl"; // Default to Polish
  });

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, newLanguage);
    }
  };

  const t = (key: string, params?: Record<string, any>): string => {
    // Dla dosłownych kluczy tłumaczeń widzianych na stronie
    if (language === 'pl') {
      // Sprawdź czy mamy dokładne tłumaczenie dla tego klucza
      const exactMatch = getExactTranslation(key);
      if (exactMatch) {
        return exactMatch;
      }
      
      // Sprawdź w słowniku polskich tekstów
      if (polishTexts[key]) {
        let text = polishTexts[key];
        
        // Zastąp parametry w tłumaczeniu, jeśli są
        if (params) {
          Object.entries(params).forEach(([param, value]) => {
            text = text.replace(`#{${param}}`, String(value));
          });
        }
        
        return text;
      }
    }
    
    // Standardowa logika tłumaczeń
    const translation = translations[key];
    if (!translation) {
      // W przypadku braku tłumaczenia, zwracamy polski tekst jeśli istnieje, w przeciwnym razie klucz
      if (language === 'pl') {
        // Ostatnia szansa - sprawdź czy klucz wygląda jak "a.b.c" i spróbuj go znaleźć w dokładnych tłumaczeniach
        const exactMatch = getExactTranslation(key);
        if (exactMatch) {
          return exactMatch;
        }
      }
      return key;
    }
    
    let text = translation[language as 'en' | 'pl'] || translation.en || key;
    
    // Zastąp parametry w tłumaczeniu
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`#{${param}}`, String(value));
      });
    }
    
    return text;
  };

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}