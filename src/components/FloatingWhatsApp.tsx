"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useBrand } from "@/components/BrandProvider";

interface FloatingWhatsAppProps {
  aboveNav?: boolean;
}

export function FloatingWhatsApp({ aboveNav = true }: FloatingWhatsAppProps) {
  const brand = useBrand();
  return (
    <a
      href={buildWhatsAppUrl(
        "Hello MGE-SWITCH, I need ship agency support for an upcoming port call.",
        brand.whatsapp
      )}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition active:scale-95 hover:bg-[#20BD5A] md:right-8",
        aboveNav
          ? "bottom-[calc(4.5rem+env(safe-area-inset-bottom)+0.75rem)] lg:bottom-8"
          : "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-8"
      )}
      aria-label="Chat with operations on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
