import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { BrandConfig } from "@/lib/brand-types";

export function MaintenancePage({ brand }: { brand: BrandConfig }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center safe-top safe-bottom">
      <Logo variant="light" />
      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
        Temporarily unavailable
      </p>
      <h1 className="font-display mt-4 max-w-lg text-3xl font-bold text-white sm:text-4xl">
        {brand.name} is undergoing maintenance
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
        {brand.maintenanceMessage}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${brand.phone}`}
          className="min-h-[48px] bg-gold px-8 py-3 text-xs font-bold uppercase tracking-widest text-white"
        >
          Call {brand.phone}
        </a>
        <a
          href={`https://wa.me/${brand.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] border border-white/30 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white"
        >
          WhatsApp
        </a>
      </div>
      <Link
        href="/login"
        className="mt-8 text-xs text-white/50 hover:text-gold hover:underline"
      >
        Admin login
      </Link>
    </div>
  );
}
