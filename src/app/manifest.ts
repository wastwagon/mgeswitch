import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MGE-SWITCH — Ship Agency & Allied Services",
    short_name: "MGE-SWITCH",
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
        src: "/images/mge-switch-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/mge-switch-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
