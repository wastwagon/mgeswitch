export interface BlogImageMeta {
  image: string;
  imageAlt: string;
}

export const BLOG_IMAGES: Record<string, BlogImageMeta> = {
  "how-fast-vessel-supply-support-protects-turnaround": {
    image: "/gallery/ulfborg-ship-provisions-container-01.jpeg",
    imageAlt: "Ulfborg Rebooth marine supply cargo staged inside a shipping container",
  },
  "what-good-marine-provisioning-looks-like-in-west-africa": {
    image: "/gallery/ulfborg-marine-cabin-stores-02.jpeg",
    imageAlt: "Marine provisions and cabin stores prepared for vessel delivery",
  },
  "nautical-publications-and-why-bridge-teams-cannot-compromise": {
    image: "/images/ulfborg-nautical.svg",
    imageAlt: "Nautical publications and navigation planning materials",
  },
  "choosing-lubricants-and-consumables-for-harsh-marine-environments": {
    image: "/images/ulfborg-lubricants.svg",
    imageAlt: "Marine lubricants and consumables for harsh operating conditions",
  },
};

export function getBlogImageMeta(slug: string, fallbackTitle: string): BlogImageMeta {
  return (
    BLOG_IMAGES[slug] ?? {
      image: "/gallery/ulfborg-ship-provisions-container-01.jpeg",
      imageAlt: fallbackTitle,
    }
  );
}
