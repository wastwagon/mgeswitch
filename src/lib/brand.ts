import { getSiteSettings } from "@/lib/settings";
import {
  mapSettingsToBrand,
  STATIC_BRAND,
  type BrandConfig,
} from "@/lib/brand-types";

export type { BrandConfig };
export { mapSettingsToBrand, STATIC_BRAND };

export async function getBrandConfig(): Promise<BrandConfig> {
  try {
    const settings = await getSiteSettings();
    return mapSettingsToBrand(settings);
  } catch {
    return STATIC_BRAND;
  }
}
