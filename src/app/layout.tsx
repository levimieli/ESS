import type { Metadata } from "next";
import { Montserrat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FooterGate } from "@/components/site/footer-gate";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — WHS Consulting in NSW`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "WHS consulting NSW",
    "work health and safety consultant",
    "safety audit NSW",
    "site inspections",
    "WHS management system",
    "ISO 45001 certification",
    "SafeWork NSW compliance",
    "workplace safety Sydney",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — WHS Consulting in NSW`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — WHS Consulting in NSW`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  areaServed: { "@type": "State", name: "New South Wales" },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: "AU",
  },
  knowsAbout: [
    "Work Health and Safety Act 2011",
    "WHS auditing",
    "Site safety inspections",
    "WHS management systems",
    "ISO 45001",
  ],
  serviceType: [
    "WHS Auditing & Compliance",
    "Site Inspections",
    "WHS Management Systems",
    "ISO 45001 Readiness",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${hanken.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only rounded-md focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-graphite focus:px-4 focus:py-2.5 focus:text-onDark"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <FooterGate>
            <Footer />
          </FooterGate>
        </SmoothScroll>
      </body>
    </html>
  );
}
