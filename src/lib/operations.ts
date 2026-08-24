/** Additional operational copy layered on the existing service/port content. */

export const PORT_CALL_SCOPE = [
  {
    title: "Arrivals",
    detail:
      "Notice of arrival, berth and pilot coordination, inward clearance, and first-line attendance when the vessel is due.",
  },
  {
    title: "Port operations",
    detail:
      "Stay management, authorities, cargo and husbandry windows, and the daily coordination that keeps the call moving.",
  },
  {
    title: "Husbandry",
    detail:
      "Crew, stores, spares, surveys, travel, and welfare sequenced around the operational plan — not treated as afterthoughts.",
  },
  {
    title: "Departure",
    detail:
      "Outward formalities, final disbursements, and a clean handover so the vessel sails with a clear record of the call.",
  },
] as const;

export const PORT_PROFILES = [
  {
    port: "Tema Port",
    country: "Ghana",
    role: "Ghana’s eastern commercial gateway",
    summary:
      "Ground operations in Tema cover liner, tanker, project, and offshore-related calls through Ghana’s principal commercial port.",
    points: [
      "Ship agency and husbandry attendance",
      "Crew change, visas, and travel",
      "Spares clearing and onboard delivery",
      "Support for oil & gas related traffic",
    ],
  },
  {
    port: "Takoradi Port",
    country: "Ghana",
    role: "Ghana’s western energy and project hub",
    summary:
      "Takoradi is central to Ghana’s offshore oil and gas logistics. Our western desk handles agency, husbandry, and upstream-related port support.",
    points: [
      "Agency for OSVs, tankers, and project vessels",
      "Crew movements for offshore rotations",
      "Spares and stores for energy campaigns",
      "Protective attendance when owners require it",
    ],
  },
  {
    port: "Lome Port",
    country: "Togo",
    role: "West Africa’s key transit hub",
    summary:
      "Lome is a major transhipment and transit port for the region. Allied coverage here keeps owners with one accountable desk across the corridor.",
    points: [
      "Ship agency coverage for transit calls",
      "Protective agency attendance",
      "Documentation and turnaround support",
      "Continuity with Tema and Takoradi operations",
    ],
  },
] as const;
