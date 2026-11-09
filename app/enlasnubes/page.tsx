import type { Metadata } from "next";
import { ViewTransition } from "react";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import CookieNotice from "@/components/CookieNotice";
import EnLasNubesContent from "@/components/EnLasNubesContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const pageUrl = new URL(siteConfig.rooftop.url, siteConfig.url).toString();
const pageTitle = "En las Nubes | Rooftop y Gastrobar en Cali | Hotel Santelmo";
const pageDescription =
  "Visita En las Nubes, el rooftop y gastrobar de Hotel Santelmo en Cali. Restaurante, cocteles, música y menús estándar y prémium con vista a la ciudad.";
const venueImage = new URL(siteConfig.rooftop.image, siteConfig.url).toString();
const socialImage = new URL(siteConfig.rooftop.socialImage, siteConfig.url).toString();

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "En las Nubes",
    "En las Nubes Cali",
    "rooftop Cali",
    "gastrobar Cali",
    "restaurante con terraza en Cali",
    "terraza sur de Cali",
    "cocteles y música Cali",
    "restaurante Hotel Santelmo",
    "Hotel Santelmo",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "En las Nubes, el gastrobar y rooftop de Hotel Santelmo en Cali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [socialImage],
  },
};

const rooftopJsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: siteConfig.rooftop.name,
  description: pageDescription,
  url: pageUrl,
  image: [venueImage, socialImage],
  telephone: siteConfig.contactPhones[0].href,
  priceRange: "$14.000–$27.000 COP",
  hasMenu: `${pageUrl}#carta`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Cali",
    addressRegion: "Valle del Cauca",
    addressCountry: "CO",
  },
  parentOrganization: {
    "@type": "Hotel",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  sameAs: [siteConfig.rooftop.instagram],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Restaurante", value: true },
    { "@type": "LocationFeatureSpecification", name: "Música", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cocteles", value: true },
  ],
};

export default function EnLasNubesPage() {
  return (
    <LanguageProvider>
      <ViewTransition
        enter={{
          "en-las-nubes-forward": "en-las-nubes-route-enter",
          "santelmo-home-return": "santelmo-route-enter",
          default: "none",
        }}
        exit={{
          "en-las-nubes-forward": "en-las-nubes-route-exit",
          "santelmo-home-return": "santelmo-route-exit",
          default: "none",
        }}
      >
        <div>
          <Navbar />
          <EnLasNubesContent />
          <Footer />
          <WhatsAppButton />
          <CookieNotice />
        </div>
      </ViewTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rooftopJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </LanguageProvider>
  );
}
