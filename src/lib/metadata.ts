import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080";

export const siteConfig = {
  name: "MGE-SWITCH",
  tagline: "Ship Agency & Allied Services",
  description:
    "MGE-SWITCH is a registered Ghanaian ship agency and allied services provider operating in Tema and Takoradi Ports of Ghana and Lome, Togo — local representatives for shipowners, charterers, and operators of all vessel types.",
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
      "ship agency Lome",
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
