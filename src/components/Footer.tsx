import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CredibilityBadges } from "@/components/CredibilityBadges";
import { footerNav } from "@/lib/navigation";
import type { BrandConfig } from "@/lib/brand-types";

export function Footer({ brand }: { brand: BrandConfig }) {
  return (
    <footer id="contact" className="gradient-navy pb-nav text-white lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              {brand.tagline}. From Tema to key West African ports, we support
              vessels with premium sourcing, responsive coordination, and
              operational discipline.
            </p>
            {(brand.social.facebook ||
              brand.social.instagram ||
              brand.social.linkedin) && (
              <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-widest">
                {brand.social.facebook && (
                  <a
                    href={brand.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-gold"
                  >
                    Facebook
                  </a>
                )}
                {brand.social.instagram && (
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-gold"
                  >
                    Instagram
                  </a>
                )}
                {brand.social.linkedin && (
                  <a
                    href={brand.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-gold"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {brand.address}
              </li>
              <li>
                <a
                  href={`tel:${brand.phone}`}
                  className="flex items-center gap-3 transition hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-3 transition hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Navigation
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/75">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white pt-10">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Trusted · Responsive · Quality-led
          </p>
          <CredibilityBadges variant="dark" compact />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-xs text-white">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <p className="mt-1 text-[10px] text-white">
              <Link href="/pages/privacy-policy" className="hover:text-gold hover:underline">
                Privacy
              </Link>
              {" · "}
              <Link href="/pages/terms-of-service" className="hover:text-gold hover:underline">
                Terms
              </Link>
            </p>
          </div>
          <p className="text-xs text-white">
            Marine supply · Offshore support · West African port coverage
          </p>
        </div>
      </div>
    </footer>
  );
}
