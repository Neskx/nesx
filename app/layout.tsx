import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MobileCallBar } from "@/components/ContactTab";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { businessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const description =
  "Målare i Eslöv med omnejd. Invändig målning, fasadmålning, fönster, tapetsering och fastighetsservice. Fast pris efter kostnadsfritt hembesök, svar inom 24 timmar och ROT-avdrag direkt på fakturan.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Målare i Eslöv – ${site.shortName} | Måleri & fastighetsservice`,
    template: `%s | ${site.shortName}`,
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `Målare i Eslöv – ${site.shortName}`,
    description,
    url: "/",
    siteName: site.name,
    locale: "sv_SE",
    type: "website",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[4.75rem] lg:pb-0">
        <a
          href="#innehall"
          className="sr-only z-50 rounded-md bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Hoppa till innehållet
        </a>
        <Header />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <CookieBanner />
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
