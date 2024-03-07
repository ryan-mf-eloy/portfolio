"use client";

import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";

export function useLanguage() {
  return useContext(LanguageContext);
}
