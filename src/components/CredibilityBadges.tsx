import {
  BadgeCheck,
  Users,
  MapPinned,
  Radio,
  ClipboardCheck,
  Compass,
} from "lucide-react";
import { CREDENTIALS } from "@/lib/trust";
import { cn } from "@/lib/utils";

const iconMap = {
  licensed: BadgeCheck,
  insured: Users,
  registered: MapPinned,
  "secure-pay": Radio,
  "crew-focus": ClipboardCheck,
  premium: Compass,
} as const;

interface CredibilityBadgesProps {
  variant?: "light" | "dark";
}

export function CredibilityBadges({
  variant = "light",
}: CredibilityBadgesProps) {
  const isDark = variant === "dark";

  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {CREDENTIALS.map((cred, index) => {
        const Icon = iconMap[cred.id as keyof typeof iconMap] ?? BadgeCheck;
        return (
          <article
            key={cred.id}
            className="border-t border-gold/50 pt-5"
          >
            <div className="flex items-center justify-between">
              <Icon
                className={cn("h-5 w-5", isDark ? "text-gold" : "text-navy")}
                strokeWidth={1.6}
              />
              <span className="font-display text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3
              className={cn(
                "mt-4 font-display text-xl font-semibold leading-snug",
                isDark ? "text-white" : "text-navy"
              )}
            >
              {cred.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                isDark ? "text-white/65" : "text-muted"
              )}
            >
              {cred.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
