'use client'

import { useState, useEffect } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TLanguage = 'EN' | 'PT'

export default function LanguageToggle() {
  const [language, setLanguage] = useState<TLanguage>('EN')

  const handleLanguageChange = (selectedLanguage: TLanguage) => { 
    setLanguage(selectedLanguage)
    window.localStorage.setItem('language', selectedLanguage)
  }

  useEffect(() => {
     const storedLanguage = window.localStorage.getItem('language') as TLanguage

    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 w-12 rounded-md">
          {language}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={language}
          onValueChange={
            (selectedLanguage) =>
              handleLanguageChange(selectedLanguage as TLanguage)
          }
          >
          <DropdownMenuRadioItem value="EN">EN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PT">PT</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}