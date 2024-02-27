'use client'
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  IconMoonStars,
  IconSunWind,
  IconDeviceDesktop
} from '@tabler/icons-react'

type TThemes = 'dark' | 'light' | 'system' 

export default function ThemeToggle() {
  const storedTheme = window.localStorage.getItem('theme') as TThemes
  const [theme, setTheme] = useState<TThemes>(storedTheme || 'system');

  const handleToggleTheme = (value: TThemes) => {
    const root = window.document.documentElement

    if (value === 'system') {
      root.classList.remove("system");
      root.classList.add("dark");
    }
    if (value === 'dark') {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    if (value === 'light') {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    setTheme(value)
    window.localStorage.setItem('theme', value)
  }
  
  useEffect(() => {
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 w-12 rounded-md">
        {theme === 'dark'
          ? (<IconMoonStars width={25} />)
          : theme === 'light' ? (<IconSunWind width={25} />)
          : (<IconDeviceDesktop width={25} />)
        }
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => handleToggleTheme(value as TThemes)}
        >
        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}