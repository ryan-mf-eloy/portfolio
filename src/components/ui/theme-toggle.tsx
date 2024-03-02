"use client";

import { useLanguage } from "@/context/language-provider";
import { useTheme } from "@/context/theme-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IconMoonStars, IconSunWind } from "@tabler/icons-react";

export type TThemes = "dark" | "light" | "system";

export default function ThemeToggle() {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = (value: TThemes) => {
    const root = window.document.documentElement;

    if (value === "system") {
      root.classList.remove("system");
      root.classList.add("dark");
    }
    if (value === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    if (value === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    setTheme(value);
    window.localStorage.setItem("theme", value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 w-12 rounded-md">
        {theme !== "light" ? (
          <IconMoonStars width={25} />
        ) : (
          <IconSunWind width={25} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => {
            handleToggleTheme(value as TThemes);
          }}
        >
          <DropdownMenuRadioItem value="light">
            {language === "en" ? "Light" : "Claro"}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {language === "en" ? "Dark" : "Escuro"}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            {language === "en" ? "System" : "Sistema"}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
