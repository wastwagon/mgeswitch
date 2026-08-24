import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Enquiry Support",
  description:
    "Legacy booking routes now point to Ulfborg Rebooth's enquiry and support experience.",
});

export default function BookingStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
