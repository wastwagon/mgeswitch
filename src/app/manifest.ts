import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ulfborg Rebooth — Marine & Offshore Supply",
    short_name: "Ulfborg",
    description:
      "Premium marine and offshore supply support from Tema across key West African ports.",
    start_url: "/",
    display: "standalone",
    background_color: "#1B365D",
    theme_color: "#1B365D",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/images/ulfborg-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/ulfborg-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
