import { BRAND } from "@/lib/constants";

export const TRUST_STATS = [
  { value: "3", label: "Ports Covered", suffix: "" },
  { value: "All", label: "Vessel Types", suffix: "" },
  { value: "24/7", label: "Response Mindset", suffix: "" },
  { value: "100%", label: "Client-Focused Delivery", suffix: "" },
] as const;

export const GOOGLE_REVIEWS = {
  rating: 5,
  totalReviews: 0,
  reviewUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080",
} as const;

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Fleet Operations Manager",
    initials: "FO",
    location: "Regional Owner",
    rating: 5,
    date: "Recent appointment",
    quote:
      "MGE-SWITCH handles port formalities with calm precision. ETA coordination and husbandry support made our Tema call straightforward.",
  },
  {
    id: "2",
    name: "Crewing Superintendent",
    initials: "CS",
    location: "Takoradi call",
    rating: 5,
    date: "Crew change",
    quote:
      "Visa, hotel, and embarkation logistics were organised clearly. The crew movement felt managed rather than improvised.",
  },
  {
    id: "3",
    name: "Technical Superintendent",
    initials: "TS",
    location: "Spares delivery",
    rating: 5,
    date: "Urgent spare",
    quote:
      "They cleared and delivered critical spares with supply-boat coordination that protected our schedule.",
  },
  {
    id: "4",
    name: "Owners' Representative",
    initials: "OR",
    location: "Protective agency",
    rating: 5,
    date: "Lome attendance",
    quote:
      "Protective attendance was attentive and efficient — exactly the independent cover we needed during turnaround.",
  },
] as const;

export const FOOTER_PROOF = [
  {
    id: "registered",
    title: "Registered Ghanaian agency",
    detail: "Tema and Takoradi, with allied cover in Lome",
  },
  {
    id: "owners",
    title: "Owner representation",
    detail: "Independent attendance for owners, charterers, and operators",
  },
  {
    id: "ports",
    title: "Three-port network",
    detail: "Tema · Takoradi · Lome, coordinated as one desk",
  },
  {
    id: "response",
    title: "Always-on operations",
    detail: "Port-call response organised around ETA, not office hours",
  },
] as const;

export const CREDENTIALS = [
  {
    id: "licensed",
    title: "Registered Ghanaian Agency",
    description:
      "Ship agency and allied services provider operating in Tema, Takoradi, and Lome",
  },
  {
    id: "insured",
    title: "Local Representation",
    description:
      "Representing shipowners, charterers, and operators of all vessel types",
  },
  {
    id: "registered",
    title: "Strategic Port Coverage",
    description: `Tema & Takoradi, Ghana · Lome, Togo · ${BRAND.address}`,
  },
  {
    id: "secure-pay",
    title: "Responsive Coordination",
    description:
      "Fast communication for appointments, crew plans, spares, and protective attendance",
  },
  {
    id: "crew-focus",
    title: "Husbandry Discipline",
    description:
      "Documentation, visas, travel, accommodation, surveys, and P&I support in one process",
  },
  {
    id: "premium",
    title: "Precision & Care",
    description:
      "A commitment to navigating port complexities and delivering a seamless vessel experience",
  },
] as const;
