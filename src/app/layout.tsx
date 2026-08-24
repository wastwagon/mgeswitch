import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { createMetadata } from "@/lib/metadata";
import { getBrandConfig } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const brand = await getBrandConfig();
    return createMetadata({
      description: brand.seoDescription,
      openGraph: {
        title: `${brand.name} | ${brand.tagline}`,
        description: brand.seoDescription,
        images: [
          {
            url: brand.ogImage,
            width: 1200,
            height: 630,
            alt: `${brand.name} — Premium marine and offshore supply solutions`,
          },
        ],
      },
      twitter: {
        title: `${brand.name} | ${brand.tagline}`,
        description: brand.seoDescription,
        images: [brand.ogImage],
      },
    });
  } catch {
    return createMetadata();
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
