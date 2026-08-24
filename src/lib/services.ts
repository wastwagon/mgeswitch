export type ServiceDetail = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  products: string[];
  vessels: string[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: "ship-agency",
    title: "Ship Agency & Husbandry Services",
    eyebrow: "Full port-call representation",
    summary:
      "ETA/ETD, port stay, and legal documentation managed with precision so embarkation, disembarkation, visas, travel, and accommodation run smoothly.",
    description:
      "At MGE-SWITCH, your vessel's port call is handled with care. We coordinate formalities, husbandry needs, and local logistics so owners, charterers, and operators experience a streamlined process from arrival through departure.",
    image: "/images/services/technical.png",
    imageAlt: "Ship agency and husbandry coordination at port",
    products: [
      "ETA/ETD and port-stay management",
      "Legal documentation and port formalities",
      "Embarkation and disembarkation support",
      "Visa requirements coordination",
      "Air ticketing and crew accommodation",
      "Class survey arrangements",
      "P&I insurance service coordination",
    ],
    vessels: [
      "All vessel types",
      "Owners' representatives",
      "Charterers",
      "Operators",
    ],
  },
  {
    id: "ship-spares",
    title: "Ship Spares",
    eyebrow: "Clearing & onboard delivery",
    summary:
      "Expertise in clearing and delivering ship spares, including supply-boat coordination for safe delivery onboard.",
    description:
      "Our clearing and delivery capability for ship spares is unmatched. We coordinate customs processes and supply-boat logistics so critical parts reach the vessel safely and on time.",
    image: "/images/services/technical.png",
    imageAlt: "Ship spares clearing and supply boat delivery",
    products: [
      "Spares clearing and customs handling",
      "Quayside delivery coordination",
      "Supply-boat arrangements",
      "Safe onboard handover",
      "Urgent spare-part callouts",
    ],
    vessels: [
      "Cargo vessels",
      "Tankers",
      "Offshore support vessels",
      "Project vessels",
    ],
  },
  {
    id: "crew-change",
    title: "Crew Change",
    eyebrow: "Travel, visas & logistics",
    summary:
      "Complete crew-change support covering visas, embarkation and disembarkation, air ticketing, and accommodation.",
    description:
      "We ease the administrative and logistics burden of crew changes so rotations stay on schedule and crews move through port with minimal friction.",
    image: "/images/services/welfare.png",
    imageAlt: "Crew change and travel support at port",
    products: [
      "Crew embarkation and disembarkation",
      "Visa and immigration support",
      "Air ticketing arrangements",
      "Hotel and local transport",
      "Joiners and leavers coordination",
    ],
    vessels: [
      "All vessel types",
      "Offshore units",
      "Project campaigns",
    ],
  },
  {
    id: "protective-agency",
    title: "Protective Agency",
    eyebrow: "Owner-focused attendance",
    summary:
      "Protective agency services that prioritise the security and efficiency of vessel operations and turnaround.",
    description:
      "MGE-SWITCH provides dedicated protective agency attendance — safeguarding owners' interests while supporting secure, efficient vessel operations throughout the port call.",
    image: "/images/services/offshore.png",
    imageAlt: "Protective agency attendance for vessel operations",
    products: [
      "Owners' protective representation",
      "Turnaround monitoring",
      "Operational security focus",
      "Independent attendance and reporting",
      "Stakeholder coordination in port",
    ],
    vessels: [
      "Owners and managers",
      "Charterers requiring protective cover",
      "All vessel types",
    ],
  },
];
