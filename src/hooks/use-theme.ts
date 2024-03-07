"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/theme-context";

export function useTheme() {
  return useContext(ThemeContext);
}
