export const IMAGES = {
  logo: "/images/ulfborg-logo.svg",
  icon: "/images/ulfborg-icon.svg",
  hero: "/images/hero-marine-supply.png",
  meetGreet: "/gallery/ulfborg-marine-cabin-stores-02.jpeg",
  og: "/images/ulfborg-og.svg",
  services: {
    lubricants: "/images/services/lubricants.png",
    provisions: "/images/services/provisions.png",
    ropes: "/images/services/ropes.png",
    safety: "/images/services/safety.png",
    nautical: "/images/services/nautical.png",
    technical: "/images/services/technical.png",
    chemicals: "/images/services/chemicals.png",
    medicalCabin: "/images/services/medical-cabin.png",
  },
  fleet: {
    sedan: "/images/services/lubricants.png",
    suv: "/images/services/safety.png",
    van: "/images/services/nautical.png",
  },
} as const;

export const FLEET_IMAGE_MAP: Record<string, string> = {
  "executive-sedan": IMAGES.fleet.sedan,
  "premium-suv": IMAGES.fleet.suv,
  "luxury-van": IMAGES.fleet.van,
};
