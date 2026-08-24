import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CredibilityBadges } from "@/components/CredibilityBadges";
import { PageHero } from "@/components/PageHero";
import { ABOUT_CONTENT } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about MGE-SWITCH, a Ghanaian-registered ship agency, husbandry, and oil and gas upstream partner covering Tema, Takoradi, and Lome.",
  openGraph: {
    title: "About MGE-SWITCH | Ship Agency & Allied Services",
    description:
      "A premium Ghanaian ship agency partner built around responsiveness, quality, and vessel support.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "MGE-SWITCH ship agency support" }],
  },
});

export default function AboutPage() {
  const { hero, story, values, stats, serviceArea } = ABOUT_CONTENT;

  return (
    <>
        <PageHero
          eyebrow={hero.eyebrow}
          title={hero.headline}
          description={hero.subheadline}
          image={IMAGES.meetGreet}
          imageAlt="MGE-SWITCH ship agency operations"
        />

        {/* Stats */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-7xl flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-1 items-baseline gap-4 px-6 py-8 sm:py-10">
                <span className="font-display text-sm text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Our Story
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
                {story.title}
              </h2>
              <div className="mt-8 space-y-5">
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={IMAGES.hero}
                alt="Ship agency attendance at a commercial port"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 border-l-4 border-gold bg-navy/90 px-6 py-5 backdrop-blur">
                <p className="text-[10px] uppercase tracking-widest text-gold">Headquarters</p>
                <p className="mt-1 text-sm font-medium text-white">{BRAND.address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-light-blue-bg/40 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Our Values
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
                What we stand for
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, i) => (
                <article
                  key={value.title}
                  className="border border-border bg-white p-8 sm:p-10"
                >
                  <span className="font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-xl font-bold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Service area */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Coverage
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold text-navy">
                  {serviceArea.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {serviceArea.description}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {serviceArea.areas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 border border-border px-4 py-3 text-sm text-navy"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-gold" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="border-t border-border bg-navy py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Credentials
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
                Built on trust and operational rigour
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Every appointment is approached with the discipline clients
                expect from a serious maritime partner: careful coordination,
                dependable communication, and focus on vessel turnaround.
              </p>
            </div>
            <CredibilityBadges variant="dark" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy py-16 text-center sm:py-20">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to appoint a responsive agency partner?
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Share your vessel requirements and let our team coordinate a
              practical response around your next call.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/corporate"
                className="bg-gold px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
              >
                Send an Enquiry
              </Link>
              <Link
                href="/services"
                className="border border-white/30 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
