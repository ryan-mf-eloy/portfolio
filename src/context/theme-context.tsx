"use client";

import { createContext, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { type TThemes } from "@/components/ui/theme-toggle";

interface ThemeContextType {
  theme: TThemes;
  setTheme: React.Dispatch<React.SetStateAction<TThemes>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export function NextThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<TThemes>("system");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as TThemes;

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
