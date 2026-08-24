import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/90" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          Ready To Supply
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Let us support your next vessel call
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
          From provisions and medical stores to lubricants, ropes, and technical
          requirements, our team is ready to coordinate a dependable response
          around your port and delivery window.
        </p>
        <Link
          href="/corporate"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center bg-gold px-12 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white active:scale-[0.98]"
        >
          Send Your Requirement
        </Link>
      </div>
    </section>
  );
}
