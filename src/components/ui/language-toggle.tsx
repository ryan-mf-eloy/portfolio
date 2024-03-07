"use client";

import { useLanguage } from "@/hooks/use-language";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type TLanguage = "en" | "pt";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleChangeLanguage = (selectedLanguage: TLanguage) => {
    setLanguage(selectedLanguage);
    window.localStorage.setItem("language", selectedLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 w-12 rounded-md">
        {language.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(selectedLanguage) => {
            handleChangeLanguage(selectedLanguage as TLanguage);
          }}
        >
          <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pt">PT</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
