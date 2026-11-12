import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import {
  COMPANY_INFO,
  FOUNDERS,
  SITE_URL,
  isConfiguredValue,
} from "@/config/company";
import { MotionProvider } from "@/components/MotionPrimitives";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_INFO.legalName} | Engineering Intelligence`,
    template: `%s | ${COMPANY_INFO.legalName}`,
  },
  description: COMPANY_INFO.heroDescription,
  keywords: [
    "Aetheron.AI Technologies Private Limited",
    "Aetheron.AI",
    "Artificial Intelligence",
    "Intelligent Software Systems",
    "Industrial Technology",
    "AetherBuilt",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: COMPANY_INFO.legalName,
    title: `${COMPANY_INFO.legalName} | ${COMPANY_INFO.positioningStatement}`,
    description: COMPANY_INFO.heroDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_INFO.legalName,
    description: COMPANY_INFO.positioningStatement,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function buildOrganizationJsonLd() {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.legalName,
    alternateName: COMPANY_INFO.shortName,
    url: SITE_URL,
    description: COMPANY_INFO.heroDescription,
    founders: FOUNDERS.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.designation,
    })),
  };

  if (isConfiguredValue(COMPANY_INFO.officialEmail)) {
    jsonLd.email = COMPANY_INFO.officialEmail;
  }
  if (isConfiguredValue(COMPANY_INFO.officialPhone)) {
    jsonLd.telephone = COMPANY_INFO.officialPhone;
  }
  if (isConfiguredValue(COMPANY_INFO.registeredOffice)) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.registeredOffice,
    };
  }

  return jsonLd;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FAFBFD] text-[#101C32]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#142A49] focus:px-5 focus:py-2.5 focus:text-[13.5px] focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <MotionProvider>
          <Preloader />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
