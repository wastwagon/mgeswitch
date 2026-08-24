export const IMAGES = {
  logo: "/images/mge-switch-logo.svg",
  icon: "/images/mge-switch-icon.svg",
  hero: "/images/hero-ship-agency.png",
  meetGreet: "/gallery/mge-ship-agency-port-01.png",
  og: "/images/mge-switch-og.svg",
  services: {
    agency: "/images/services/ship-agency.png",
    spares: "/images/services/ship-spares.png",
    crew: "/images/services/crew-change.png",
    protective: "/images/services/protective-agency.png",
    // legacy aliases used by older components
    lubricants: "/images/services/ship-spares.png",
    provisions: "/images/services/crew-change.png",
    ropes: "/images/services/protective-agency.png",
    safety: "/images/services/ship-agency.png",
    nautical: "/images/services/protective-agency.png",
    technical: "/images/services/ship-agency.png",
    chemicals: "/images/services/ship-spares.png",
    medicalCabin: "/images/services/crew-change.png",
  },
  fleet: {
    sedan: "/images/services/ship-agency.png",
    suv: "/images/services/protective-agency.png",
    van: "/images/services/crew-change.png",
  },
} as const;

export const FLEET_IMAGE_MAP: Record<string, string> = {
  "executive-sedan": IMAGES.fleet.sedan,
  "premium-suv": IMAGES.fleet.suv,
  "luxury-van": IMAGES.fleet.van,
};
