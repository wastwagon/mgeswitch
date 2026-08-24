import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MGE-SWITCH — Ship Agency, Husbandry & Oil & Gas",
    short_name: "MGE-SWITCH",
    description:
      "Ghanaian-registered ship agency, husbandry, and oil and gas upstream support in Tema, Takoradi, and Lome.",
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
