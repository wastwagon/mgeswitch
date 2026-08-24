export type BrandConfig = {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  seoDescription: string;
  ogImage: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

type BrandSettingsInput = {
  site_name: string;
  site_tagline: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  contact_address: string;
  seo_default_description: string;
  seo_og_image: string;
  maintenance_mode: string;
  maintenance_message: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
};

export function mapSettingsToBrand(settings: BrandSettingsInput): BrandConfig {
  return {
    name: settings.site_name,
    tagline: settings.site_tagline,
    phone: settings.contact_phone,
    whatsapp: settings.contact_whatsapp,
    email: settings.contact_email,
    address: settings.contact_address,
    seoDescription: settings.seo_default_description,
    ogImage: settings.seo_og_image || "/images/mge-switch-og.svg",
    maintenanceMode: settings.maintenance_mode === "true",
    maintenanceMessage:
      settings.maintenance_message ||
      "We are performing scheduled maintenance. Please check back shortly.",
    social: {
      facebook: settings.social_facebook,
      instagram: settings.social_instagram,
      linkedin: settings.social_linkedin,
    },
  };
}

/** Static fallback for client components before hydration */
export const STATIC_BRAND: BrandConfig = {
  name: "MGE-SWITCH",
  tagline: "Ship Agency & Allied Services",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+233 000 000 000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233000000000",
  email: "ops@mge-switch.com",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ??
    "Tema & Takoradi Ports, Ghana · Lome, Togo",
  seoDescription:
    "MGE-SWITCH is a registered Ghanaian ship agency and allied services provider operating in Tema and Takoradi Ports of Ghana and Lome, Togo.",
  ogImage: "/images/mge-switch-og.svg",
  maintenanceMode: false,
  maintenanceMessage: "",
  social: { facebook: "", instagram: "", linkedin: "" },
};
