"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { type TLanguage } from "../components/ui/language-toggle";

interface LanguageContextType {
  language: TLanguage;
  setLanguage: React.Dispatch<React.SetStateAction<TLanguage>>;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<TLanguage>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("language") as TLanguage;

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
