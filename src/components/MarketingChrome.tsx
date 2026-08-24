"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { Header } from "@/components/Header";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasBottomNav = !pathname.startsWith("/corporate");

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div>{children}</div>
      {hasBottomNav && (
        <MobileBottomNav onMenuOpen={() => setMenuOpen(true)} />
      )}
      <FloatingWhatsApp aboveNav={hasBottomNav} />
      <PwaInstallPrompt hasBottomNav={hasBottomNav} />
    </>
  );
}
