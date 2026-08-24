import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CredibilityBadges } from "@/components/CredibilityBadges";
import { ABOUT_CONTENT } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Ulfborg Rebooth, a Ghanaian marine and offshore supply company serving Tema, Takoradi, and major West African ports.",
  openGraph: {
    title: "About Ulfborg Rebooth | Marine & Offshore Supply",
    description:
      "A premium Ghanaian marine supply partner built around responsiveness, quality, and vessel support.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "Ulfborg Rebooth marine support" }],
  },
});

export default function AboutPage() {
  const { hero, story, values, stats, serviceArea } = ABOUT_CONTENT;

  return (
    <>
        {/* Hero */}
        <section className="relative flex min-h-[60vh] items-end overflow-hidden">
          <Image
            src={IMAGES.meetGreet}
            alt="Ulfborg Rebooth marine supply operations"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              {hero.eyebrow}
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.subheadline}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-10 text-center sm:py-12">
                <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
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
                alt="Marine supply cargo prepared for delivery"
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
                Every supply request is approached with the discipline clients
                expect from a serious maritime partner: careful sourcing,
                dependable communication, and focus on vessel readiness.
              </p>
            </div>
            <CredibilityBadges variant="dark" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy py-16 text-center sm:py-20">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to work with a responsive supply partner?
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
