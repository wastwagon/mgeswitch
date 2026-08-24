import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function CTABanner() {
  return (
    <section className="bg-navy-dark">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[420px]">
          <Image
            src={IMAGES.hero}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Ready To Supply
          </p>
          <h2 className="font-display mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl">
            Let us support your next vessel call
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            From provisions and medical stores to lubricants, ropes, and technical
            requirements, our team is ready to coordinate a dependable response
            around your port and delivery window.
          </p>
          <Link
            href="/corporate"
            className="mt-8 inline-flex min-h-[48px] w-fit items-center justify-center bg-gold px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light active:scale-[0.98]"
          >
            Send Your Requirement
          </Link>
        </div>
      </div>
    </section>
  );
}
