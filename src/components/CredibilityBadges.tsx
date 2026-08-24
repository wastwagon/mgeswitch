import {
  ShieldCheck,
  BadgeCheck,
  Car,
  Building2,
  Clock,
  Receipt,
} from "lucide-react";
import { CREDENTIALS } from "@/lib/trust";
import { cn } from "@/lib/utils";

const iconMap = {
  licensed: BadgeCheck,
  insured: ShieldCheck,
  registered: Building2,
  "secure-pay": Receipt,
  support: Clock,
  "fixed-fare": Car,
} as const;

interface CredibilityBadgesProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export function CredibilityBadges({
  variant = "light",
  compact = false,
}: CredibilityBadgesProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {CREDENTIALS.map((cred) => {
        const Icon = iconMap[cred.id as keyof typeof iconMap] ?? ShieldCheck;
        return (
          <div
            key={cred.id}
            className={cn(
              "flex gap-3 border p-4",
              isDark
                ? "border-white/15 bg-white/5"
                : "border-border bg-white"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center",
                isDark ? "bg-gold text-white" : "bg-navy/5 text-navy"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  isDark ? "text-white" : "text-navy"
                )}
              >
                {cred.title}
              </p>
              {!compact && (
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed",
                    isDark ? "text-white/70" : "text-muted"
                  )}
                >
                  {cred.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
