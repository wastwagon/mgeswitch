import { BRAND } from "@/lib/constants";

export const TRUST_STATS = [
  { value: "20+", label: "Years Operating", suffix: "" },
  { value: "6", label: "Port Locations", suffix: "" },
  { value: "24/7", label: "Response Mindset", suffix: "" },
  { value: "100%", label: "Client-Focused Delivery", suffix: "" },
] as const;

export const GOOGLE_REVIEWS = {
  rating: 20,
  totalReviews: 6,
  reviewUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080",
} as const;

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Marine Procurement Lead",
    initials: "MP",
    location: "Offshore Support Client",
    rating: 5,
    date: "Recent engagement",
    quote:
      "Ulfborg Rebooth responds with urgency, understands vessel turnaround pressure, and delivers the right stores with a calm, dependable process.",
  },
  {
    id: "2",
    name: "Port Operations Coordinator",
    initials: "PO",
    location: "Tema, Ghana",
    rating: 5,
    date: "Repeat support",
    quote:
      "Their strength is not only supply availability but how well they coordinate the final delivery window. That responsiveness matters when every hour alongside counts.",
  },
  {
    id: "3",
    name: "Chief Steward",
    initials: "CS",
    location: "Regional Fleet",
    rating: 5,
    date: "Provisioning cycle",
    quote:
      "The provisions quality, packaging discipline, and attention to crew-welfare details make their deliveries feel considered rather than simply transactional.",
  },
  {
    id: "4",
    name: "Technical Superintendent",
    initials: "TS",
    location: "West Africa",
    rating: 5,
    date: "Multi-port support",
    quote:
      "From lubricants and technical items to urgent rope requests, the team communicates clearly and stays aligned with vessel specification and safety expectations.",
  },
] as const;

export const CREDENTIALS = [
  {
    id: "licensed",
    title: "Operational Experience",
    description: "More than two decades serving demanding marine and offshore supply needs",
  },
  {
    id: "insured",
    title: "Quality-Driven Sourcing",
    description: "Products selected with attention to specification, safety, and service reliability",
  },
  {
    id: "registered",
    title: "West Africa Coverage",
    description: `Tema headquarters with responsive support across key West African ports · ${BRAND.address}`,
  },
  {
    id: "secure-pay",
    title: "Responsive Coordination",
    description: "Fast communication for urgent requirements, delivery planning, and port-side execution",
  },
  {
    id: "support",
    title: "Crew & Vessel Focus",
    description: "Support shaped around crew welfare, technical continuity, and vessel turnaround priorities",
  },
  {
    id: "fixed-fare",
    title: "Premium Service Standard",
    description: "A dependable, customer-centric approach that clients trust across multiple port calls",
  },
] as const;
