export const BRAND = {
  name: "MGE-SWITCH",
  tagline: "Ship Agency, Husbandry & Oil & Gas Upstream",
  shortTagline: "Agency · Husbandry · Oil & Gas",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+233 000 000 000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233000000000",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ??
    "Tema & Takoradi Ports, Ghana · Lome, Togo",
  email: "ops@mge-switch.com",
} as const;

export const AIRPORT_LOCATIONS = [
  "Tema Port, Ghana",
  "Takoradi Port, Ghana",
  "Lome Port, Togo",
] as const;

export const POPULAR_DESTINATIONS = [
  "Tema Port, Ghana",
  "Takoradi Port, Ghana",
  "Lome Port, Togo",
  "Crew change & visa support",
  "Ship spares clearing & delivery",
  "Protective agency attendance",
] as const;

export const DESTINATION_GROUPS = [
  {
    id: "ghana",
    label: "Ghana",
    destinations: [
      "Tema Port — Ghana’s eastern commercial gateway",
      "Takoradi Port — western energy and project hub",
      "Crew change, embarkation & disembarkation",
      "Ship spares clearing and onboard delivery",
    ],
  },
  {
    id: "togo",
    label: "Togo",
    destinations: [
      "Lome Port — West Africa’s key transit hub",
      "Protective agency attendance",
      "Port documentation and turnaround support",
    ],
  },
  {
    id: "support",
    label: "Support Scope",
    destinations: [
      "ETA/ETD and port-stay coordination",
      "Legal documentation and formalities",
      "Air ticketing and crew accommodation",
      "Class survey and P&I coordination",
    ],
  },
] as const;

export const SERVICE_FEATURES = [
  {
    id: "ship-agency",
    title: "Ship Agency & Husbandry",
    description:
      "Your vessel's ETA/ETD, port stay, and legal documentation are handled with care — including embarkation, disembarkation, visa requirements, air ticketing, and accommodation.",
    accent: "navy",
  },
  {
    id: "ship-spares",
    title: "Ship Spares",
    description:
      "Clearing and delivering ship spares with precise coordination, including supply-boat arrangements for safe delivery onboard.",
    accent: "gold",
  },
  {
    id: "crew-change",
    title: "Crew Change",
    description:
      "End-to-end crew change support covering visas, embarkation and disembarkation, travel arrangements, and local logistics.",
    accent: "light",
  },
  {
    id: "protective-agency",
    title: "Protective Agency",
    description:
      "Protective agency services that prioritise the security and efficiency of vessel operations and turnaround.",
    accent: "navy",
  },
  {
    id: "surveys-insurance",
    title: "Class Survey & P&I Support",
    description:
      "We arrange class surveys and coordinate P&I insurance-related services so owners and operators stay operationally covered.",
    accent: "gold",
  },
  {
    id: "port-ops",
    title: "Port Operations Coordination",
    description:
      "Local representation that eases administrative and logistics burden across Tema, Takoradi, and Lome — from arrival through departure.",
    accent: "light",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas Upstream Support",
    description:
      "Ground support for offshore campaigns calling Ghana’s energy corridor — OSVs, tankers, and project traffic through Takoradi and Tema, with Lome as the regional transit option.",
    accent: "navy",
  },
] as const;

export const BOOKING_STEPS = [
  {
    step: "01",
    title: "Share Vessel Particulars",
    description:
      "Send vessel name, ETA/ETD, port, and the agency or husbandry support you need so we can prepare promptly.",
  },
  {
    step: "02",
    title: "Confirm Scope & Formalities",
    description:
      "We align documentation, crew plans, spares delivery, or protective attendance around your operational window.",
  },
  {
    step: "03",
    title: "Coordinate Port Attendance",
    description:
      "Our team manages local logistics, authorities, and onboard coordination for a smooth port stay.",
  },
  {
    step: "04",
    title: "Support Through Departure",
    description:
      "We stay engaged until formalities are complete and the vessel sails with a clear, streamlined handover.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Where does MGE-SWITCH operate?",
    answer:
      "We are a Ghanaian-registered ship agency, husbandry, and oil and gas upstream services provider. Ground operations cover Tema and Takoradi — Ghana’s two principal ports — with allied coverage at Lome, West Africa’s key transit hub.",
  },
  {
    question: "What types of vessels do you represent?",
    answer:
      "We act as local representatives of shipowners, charterers, and operators of all vessel types.",
  },
  {
    question: "What is included in ship agency and husbandry?",
    answer:
      "We support ETA/ETD and port-stay management, legal documentation, embarkation and disembarkation, visa requirements, air ticketing, accommodation, ship spares clearing and delivery, class surveys, and P&I coordination.",
  },
  {
    question: "Do you handle crew changes?",
    answer:
      "Yes. Crew change is a core service line, covering travel, visas, and embarkation or disembarkation logistics.",
  },
  {
    question: "What is protective agency?",
    answer:
      "Protective agency services focus on safeguarding the owner's interests while prioritising the security and efficiency of vessel operations and turnaround.",
  },
  {
    question: "How do we appoint MGE-SWITCH for an upcoming call?",
    answer:
      "Use the enquiry page or contact operations with vessel particulars, port, ETA/ETD, and required services. We will respond promptly.",
  },
  {
    question: "Do you handle the full port call, or only documentation?",
    answer:
      "We handle every aspect of the port call: arrivals, port operations, husbandry, crew, spares, surveys, and departure formalities — so owners and operators keep one accountable local desk.",
  },
  {
    question: "Do you support oil and gas upstream traffic?",
    answer:
      "Yes. Alongside conventional ship agency, we provide oil and gas upstream port support, particularly through Takoradi and Tema, including OSVs, tankers, and campaign-related husbandry.",
  },
] as const;

export const PAYMENT_METHODS = [
  { id: "enquiry", label: "Operations Enquiry", sub: "Agency response" },
  { id: "whatsapp", label: "WhatsApp", sub: "Fast vessel coordination" },
  { id: "email", label: "Email", sub: "Port-by-port support" },
] as const;

export const HERO_COPY = {
  eyebrow: "Tema · Takoradi · Lome",
  headline: "Navigating ports with precision and care",
  subheadline:
    "A Ghanaian-registered ship agency and husbandry partner, with oil and gas upstream support on the ground in Tema and Takoradi, and allied coverage at Lome — West Africa’s key transit hub. We handle every aspect of the port call: arrivals, operations, and departure.",
  cta: "Send An Enquiry",
} as const;
