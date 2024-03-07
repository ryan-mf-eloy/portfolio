import "@/styles/globals.css";
import "@/constants/metadata";

import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Roboto as FontSans, Roboto_Mono as FontMono } from "next/font/google";

import ThemeProvider, { NextThemeProvider } from "@/context/theme-context";
import LanguageProvider from "@/context/language-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["200", "300", "400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <LanguageProvider>
          <ThemeProvider>
            <NextThemeProvider
              attribute="class"
              defaultTheme="system"
              storageKey="theme"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Analytics />
            </NextThemeProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
