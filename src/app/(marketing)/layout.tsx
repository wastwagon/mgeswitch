import { getBrandConfig } from "@/lib/brand";
import { BrandProvider } from "@/components/BrandProvider";
import { MaintenancePage } from "@/components/MaintenancePage";
import { MarketingChrome } from "@/components/MarketingChrome";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = await getBrandConfig();

  if (brand.maintenanceMode) {
    return <MaintenancePage brand={brand} />;
  }

  return (
    <BrandProvider brand={brand}>
      <MarketingChrome>
        <main className="flex-1">{children}</main>
      </MarketingChrome>
      <Footer brand={brand} />
    </BrandProvider>
  );
}
