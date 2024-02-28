import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react';
import { Roboto as FontSans, Roboto_Mono as FontMono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import LanguageProvider from "@/context/language-provider"

import linkedinPhoto from '@/public/linkedin-photo.jpeg'

export const metadata: Metadata = {
  title: 'Ryan Eloy | Portfolio',
  description: 'Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!',
  authors: [{
    name: 'Ryan Eloy', url: 'www.linkedin.com/in/ryan-eloy-5906b91a5'
  }],
  openGraph: {
    title: 'Ryan Eloy | Portfolio',
    description: 'Passionate about technology with 5-6 years of experience creating scalable and efficient web applications. Driven by challenges!',
    images: [linkedinPhoto.src]
  },
  category: 'Web Development',
  robots: 'index'
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300', '400', '500', '700', '900']
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ['200', '300', '400',]
})

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
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
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            {children}
            <Analytics />
            </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}