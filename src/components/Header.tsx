"use client";

import Link from "next/link";
import { Phone, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { useBrand } from "@/components/BrandProvider";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  useScrollLock(menuOpen);
  const brand = useBrand();
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl safe-top">
        <div className="h-1 bg-gold" />
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
          <Logo variant="dark" />

          <nav className="hidden items-center gap-8 lg:flex">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-widest text-navy/70 transition hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/corporate"
              className="bg-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
            >
              Send Enquiry
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-navy lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-navy-dark/70 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
        <nav
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-navy-dark shadow-2xl transition-transform duration-300 ease-out safe-top safe-bottom",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Logo variant="light" showTagline={false} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[52px] items-center justify-between border-b border-white/5 px-3 text-base font-medium text-white/90 active:bg-white/5"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-gold/70" />
              </Link>
            ))}
            <a
              href={`tel:${brand.phone}`}
              className="flex min-h-[52px] items-center gap-3 px-3 text-base font-medium text-gold active:bg-white/5"
            >
              <Phone className="h-5 w-5" />
              {brand.phone}
            </a>
          </div>

          <div className="space-y-3 border-t border-white/10 p-5">
            <Link
              href="/corporate"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-gold text-sm font-bold uppercase tracking-widest text-white active:scale-[0.98]"
            >
              Send Supply Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
