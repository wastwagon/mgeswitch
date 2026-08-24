"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Users, Check } from "lucide-react";
import { FLEET_IMAGE_MAP } from "@/lib/images";
import { cn, formatCurrency } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  capacity: number;
  basePrice: string | number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function VehicleCard({ vehicle, selected, onSelect }: VehicleCardProps) {
  const image =
    vehicle.imageUrl ?? FLEET_IMAGE_MAP[vehicle.id] ?? FLEET_IMAGE_MAP["executive-sedan"];

  return (
    <button
      type="button"
      onClick={() => onSelect(vehicle.id)}
      className={cn(
        "group relative w-full overflow-hidden border-2 text-left transition-all duration-300 active:scale-[0.99]",
        selected
          ? "border-gold shadow-[0_12px_40px_-12px_rgba(201,162,39,0.45)] ring-2 ring-gold/20"
          : "border-border bg-white hover:border-navy/25 hover:shadow-md"
      )}
    >
      <div className="relative aspect-[16/10] bg-navy">
        <Image
          src={image}
          alt={vehicle.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        {selected && (
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-gold shadow-lg">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-lg font-bold text-white">{vehicle.name}</h3>
        </div>
      </div>
      <div className="p-4">
        {vehicle.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted">
            {vehicle.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Users className="h-3.5 w-3.5 text-gold" />
            Up to {vehicle.capacity} guests
          </span>
          <span className="font-display text-sm font-bold text-gold">
            from {formatCurrency(Number(vehicle.basePrice))}
          </span>
        </div>
      </div>
    </button>
  );
}

export function VehicleSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vehicles")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVehicles(data);
          if (data.length > 0 && !selectedId) {
            onSelect(data[0].id);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [selectedId, onSelect]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/3] animate-pulse bg-light-blue-bg" />
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Vehicles are not available yet. Please try again shortly or contact us on WhatsApp.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          selected={selectedId === vehicle.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
