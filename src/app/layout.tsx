import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Roboto, Roboto_Mono } from "next/font/google"

export const metadata: Metadata = {
  title: 'Ryan Eloy | Portfolio',
  description: '',
  authors: [{
    name: 'Ryan Eloy', url: 'www.linkedin.com/in/ryan-eloy-5906b91a5'
  }],
  openGraph: {
    title: 'Ryan Eloy | Portfolio',
    description: '',
    images: []
  }
}

export const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300', '400', '500', '700', '900']
})

export const fontMono = Roboto_Mono({
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          { children }
        </ThemeProvider>
      </body>
    </html>
  )
}