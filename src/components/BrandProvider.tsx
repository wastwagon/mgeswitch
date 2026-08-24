"use client";

import { createContext, useContext } from "react";
import { STATIC_BRAND, type BrandConfig } from "@/lib/brand-types";

const BrandContext = createContext<BrandConfig>(STATIC_BRAND);

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandConfig;
  children: React.ReactNode;
}) {
  return (
    <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
