import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ryaneloy.com";
const SITE_NAME = "Ryan Eloy";
const SITE_TITLE = "Ryan Eloy — Full Stack JS Developer";
const SITE_DESCRIPTION =
  "Brazilian Full Stack JavaScript developer building scalable web applications. Driven by challenges. Creator of Koda.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Ryan Eloy" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Ryan Eloy", url: "https://github.com/ryan-mf-eloy" }],
  creator: "Ryan Eloy",
  publisher: "Ryan Eloy",
  keywords: [
    "Ryan Eloy",
    "full stack developer",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "koda",
    "openkodaai",
    "brazilian developer",
    "são paulo",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "Ryan",
    lastName: "Eloy",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  other: { "theme-color": "#0c0c0c" },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Eloy",
  url: SITE_URL,
  image: `${SITE_URL}/ryan-eloy-photo.png`,
  jobTitle: "Full Stack JavaScript Developer",
  email: "mailto:ryan.eloy.bss@gmail.com",
  nationality: "Brazilian",
  sameAs: [
    "https://github.com/ryan-mf-eloy",
    "https://linkedin.com/in/ryan-eloy-5906b91a5",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${interTight.variable} ${jetbrains.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
