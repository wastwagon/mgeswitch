import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPinned,
  Phone,
  Radio,
  Users,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { FOOTER_PROOF } from "@/lib/trust";
import type { BrandConfig } from "@/lib/brand-types";

const proofIcons = {
  registered: BadgeCheck,
  owners: Users,
  ports: MapPinned,
  response: Radio,
} as const;

const agencyLinks = [
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Ports" },
  { href: "/corporate", label: "Appoint us" },
  { href: "/experience", label: "Gallery" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer({ brand }: { brand: BrandConfig }) {
  return (
    <footer id="contact" className="bg-navy-dark pb-nav text-white lg:pb-0">
      <div className="h-px bg-gold" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 border-b border-white/10 py-14 sm:py-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Next port call
            </p>
            <h2 className="font-display mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Nominate MGE-SWITCH while the vessel is still outbound.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link
              href="/corporate"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-gold px-7 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light"
            >
              Send Enquiry
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-white/20 px-7 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {brand.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {brand.tagline}. Local representation for owners, charterers, and
              operators — Tema, Takoradi, and Lome.
            </p>
            {(brand.social.facebook ||
              brand.social.instagram ||
              brand.social.linkedin) && (
              <div className="mt-6 flex flex-wrap gap-5 text-[11px] font-semibold uppercase tracking-[0.2em]">
                {brand.social.facebook && (
                  <a
                    href={brand.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 transition hover:text-gold"
                  >
                    Facebook
                  </a>
                )}
                {brand.social.instagram && (
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 transition hover:text-gold"
                  >
                    Instagram
                  </a>
                )}
                {brand.social.linkedin && (
                  <a
                    href={brand.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 transition hover:text-gold"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Agency
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {agencyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Operations
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/70">
              <li>{brand.address}</li>
              <li>
                <a href={`tel:${brand.phone}`} className="transition hover:text-white">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="transition hover:text-white">
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_PROOF.map((item) => {
            const Icon = proofIcons[item.id];
            return (
              <div key={item.id}>
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.6} />
                <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/pages/privacy-policy" className="transition hover:text-gold">
              Privacy
            </Link>
            <Link href="/pages/terms-of-service" className="transition hover:text-gold">
              Terms
            </Link>
            <span>Tema · Takoradi · Lome</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
