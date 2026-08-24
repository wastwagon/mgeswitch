import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080";

export const siteConfig = {
  name: "MGE-SWITCH",
  tagline: "Ship Agency, Husbandry & Oil & Gas Upstream",
  description:
    "MGE-SWITCH is a Ghanaian-registered ship agency, husbandry, and oil and gas upstream services provider. Ground operations cover Tema and Takoradi — Ghana’s two principal ports — with allied coverage at Lome, West Africa’s key transit hub. We handle every aspect of the vessel port call: arrivals, operations, and departure.",
  url: siteUrl,
  ogImage: "/images/mge-switch-og.svg",
  twitterHandle: "",
  locale: "en_GH",
} as const;

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: overrides?.title ?? {
      default: `${siteConfig.name} | ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: overrides?.description ?? siteConfig.description,
    keywords: [
      "ship agency Ghana",
      "ship agency Tema",
      "ship agency Takoradi",
      "oil and gas agency Ghana",
      "ship agency Takoradi oil and gas",
      "Lome port ship agency",
      "crew change Ghana",
      "protective agency West Africa",
      "ship spares clearing Tema",
      "husbandry services Ghana",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    icons: {
      icon: "/images/mge-switch-icon.svg",
      apple: "/images/mge-switch-icon.svg",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Ship agency and allied services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteConfig.name,
    },
    formatDetection: {
      telephone: true,
      email: true,
    },
    ...overrides,
  };
}

export const defaultMetadata = createMetadata();
