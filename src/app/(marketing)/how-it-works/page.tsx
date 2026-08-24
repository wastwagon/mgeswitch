import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "How We Work",
  description:
    "How MGE-SWITCH receives, sources, coordinates, and delivers ship agency requirements.",
  openGraph: {
    title: "How We Work | MGE-SWITCH",
    description: "Four simple steps to responsive ship agency execution.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "How MGE-SWITCH works" }],
  },
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="Four steps to coordinated vessel support"
        description="From receiving your requirement to final delivery planning, our process is built around speed, clarity, and dependable execution."
        image={IMAGES.hero}
        imageAlt="How MGE-SWITCH works"
        minHeight="min-h-[42vh]"
      />
      <ProcessTimeline showHeader={false} />
      <section className="border-t border-border bg-light-blue-bg/30 py-12 text-center">
        <Link
          href="/corporate"
          className="inline-block bg-navy px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark"
        >
          Start your enquiry
        </Link>
      </section>
      <CTABanner />
    </>
  );
}
