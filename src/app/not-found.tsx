"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-provider";
import { useTheme } from "@/context/theme-provider";

import { IconArrowBack } from "@tabler/icons-react";

import MovingBorderButton from "@/components/ui/moving-border-button";
import SparklesCore from "@/components/ui/sparkles";

export default function NotFound() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div>
      <div className="h-[40rem] w-full dark:bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h5 className="text-zinc-500 text-lg font-thin mb-20">
          {language === "en"
            ? "There is nobody here..."
            : "Não tem ninguém aqui..."}
        </h5>

        <h1 className="mb-5 max-md:text-7xl text-9xl font-bold text-center font-mono text-primary relative z-20">
          404
        </h1>

        <Link href={"/"} className="z-40">
          <MovingBorderButton className="gap-2">
            <IconArrowBack size={18} />
            {language === "en" ? "Back to home" : "Volver ao início"}
          </MovingBorderButton>
        </Link>

        <div className="max-w-[40rem] w-full h-40 mt-5 relative flex flex-col items-center justify-center">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={800}
            className="w-full h-full"
            particleColor={theme === "dark" ? "#fff" : "#000"}
          />

          <div className="absolute inset-0 w-full h-full dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>
      </div>
    </div>
  );
}
