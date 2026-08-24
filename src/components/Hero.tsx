"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { HERO_COPY } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { useBrand } from "@/components/BrandProvider";

export function Hero() {
  const brand = useBrand();
  return (
    <section className="relative min-h-[70vh] overflow-hidden lg:min-h-[78vh]">
      <Image
        src={IMAGES.hero}
        alt="Marine supply cargo prepared for vessel support operations"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[78vh] lg:justify-center lg:pb-16 lg:pt-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            {HERO_COPY.eyebrow}
          </p>

          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
            {HERO_COPY.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {HERO_COPY.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/corporate"
              className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
            >
              {HERO_COPY.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
