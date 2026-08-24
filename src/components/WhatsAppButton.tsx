"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
}

export function WhatsAppButton({
  message = "Hello MGE-SWITCH, I would like to discuss ship agency support for a port call.",
  className = "",
  label = "Chat on WhatsApp",
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] hover:bg-[#20BD5A] ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}
