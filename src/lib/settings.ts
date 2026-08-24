import { prisma } from "@/lib/prisma";
import { BRAND } from "@/lib/constants";

export const SETTING_KEYS = [
  "site_name",
  "site_tagline",
  "contact_phone",
  "contact_whatsapp",
  "contact_email",
  "contact_address",
  "seo_default_description",
  "seo_og_image",
  "social_facebook",
  "social_instagram",
  "social_linkedin",
  "booking_min_notice_hours",
  "maintenance_mode",
  "maintenance_message",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

export type SiteSettings = Record<SettingKey, string>;

export const DEFAULT_SETTINGS: SiteSettings = {
  site_name: BRAND.name,
  site_tagline: BRAND.tagline,
  contact_phone: BRAND.phone,
  contact_whatsapp: BRAND.whatsapp,
  contact_email: BRAND.email,
  contact_address: BRAND.address,
  seo_default_description:
    "MGE-SWITCH is a registered Ghanaian ship agency and allied services provider operating in Tema and Takoradi Ports of Ghana and Lome, Togo.",
  seo_og_image: "/images/mge-switch-og.svg",
  social_facebook: "",
  social_instagram: "",
  social_linkedin: "",
  booking_min_notice_hours: "0",
  maintenance_mode: "false",
  maintenance_message: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await prisma.siteSetting.findMany();
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Partial<
    SiteSettings
  >;
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function upsertSiteSettings(
  updates: Partial<SiteSettings>
): Promise<SiteSettings> {
  const entries = Object.entries(updates).filter(
    ([key, value]) =>
      SETTING_KEYS.includes(key as SettingKey) && value !== undefined
  ) as [SettingKey, string][];

  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    )
  );

  return getSiteSettings();
}
