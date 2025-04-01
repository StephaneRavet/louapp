import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UnifrakturCook, MedievalSharp, Cinzel, Gloock, Germania_One, Eagle_Lake } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import { RolesLoadingProvider } from "@/providers/RolesLoadingProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  adjustFontFallback: true,
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  adjustFontFallback: true,
  preload: true,
});

const unifrakturCook = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-unifraktur-cook",
  adjustFontFallback: true,
  preload: true,
});

const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-medieval-sharp",
  adjustFontFallback: true,
  preload: true,
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  adjustFontFallback: true,
  preload: true,
});

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
  adjustFontFallback: true,
  preload: true,
});

const germaniaOne = Germania_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-germania-one",
  adjustFontFallback: true,
  preload: true,
});

const eagleLake = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-eagle-lake",
  adjustFontFallback: true,
  preload: true,
});

export const viewport = {
  themeColor: '#384FAF',
}

export const metadata: Metadata = {
  title: "Le jeu du Loup",
  description: "Application d'aide pour les maîtres du jeu du Loup",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`
      ${geistSans.variable} 
      ${geistMono.variable}
      ${unifrakturCook.variable}
      ${medievalSharp.variable}
      ${cinzel.variable}
      ${gloock.variable}
      ${germaniaOne.variable}
      ${eagleLake.variable}
    `}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#384FAF" />
        <meta name="description" content="Lou Application" />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/IconKitchen-Output/ios/180.png" />

        {/* Meta tags pour iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lou" />

        {/* Meta tags pour Windows */}
        <meta name="msapplication-TileColor" content="#384FAF" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          <RolesLoadingProvider>
            {children}
          </RolesLoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
