const BLOG_IMAGE_MAP: Record<
  string,
  { image: string; imageAlt: string }
> = {
  "why-precise-port-agency-protects-vessel-turnaround": {
    image: "/gallery/mge-ship-agency-port-01.png",
    imageAlt: "Ship agency coordination at a West African commercial port",
  },
  "crew-change-essentials-in-tema-takoradi-and-lome": {
    image: "/gallery/mge-crew-change-03.png",
    imageAlt: "Crew change logistics at harbour gangway",
  },
  "protective-agency-when-owners-need-independent-cover": {
    image: "/gallery/mge-protective-agency-04.png",
    imageAlt: "Protective agency attendance during vessel turnaround",
  },
  "anatomy-of-a-full-port-call-in-ghana": {
    image: "/gallery/mge-port-operations-hero-05.png",
    imageAlt: "Port operations and vessel attendance during a Ghana port call",
  },
  "oil-and-gas-upstream-support-from-tema-and-takoradi": {
    image: "/gallery/mge-ship-spares-delivery-02.png",
    imageAlt: "Offshore and energy-related vessel support at a Ghanaian port",
  },
  "lome-west-africa-transit-hub-for-vessel-operators": {
    image: "/gallery/mge-protective-agency-04.png",
    imageAlt: "Transit-hub vessel attendance at Lome Port",
  },
};

const FALLBACK = {
  image: "/gallery/mge-port-operations-hero-05.png",
  imageAlt: "MGE-SWITCH port operations",
};

export function getBlogImageMeta(slug: string, title: string) {
  return (
    BLOG_IMAGE_MAP[slug] ?? {
      image: FALLBACK.image,
      imageAlt: title || FALLBACK.imageAlt,
    }
  );
}
