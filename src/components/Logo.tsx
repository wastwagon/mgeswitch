import Link from "next/link";
import { Anchor } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = "light",
  className,
  showTagline = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm",
          isLight ? "bg-gold" : "bg-navy"
        )}
      >
        <Anchor className={cn("h-5 w-5", isLight ? "text-navy" : "text-gold")} />
      </div>
      <div className="leading-tight">
        <span
          className={cn(
            "block text-sm font-bold tracking-tight",
            isLight ? "text-white" : "text-navy"
          )}
        >
          {BRAND.name}
        </span>
        {showTagline && (
          <span
            className={cn(
              "block text-[10px] font-medium tracking-wide",
              isLight ? "text-white/60" : "text-muted"
            )}
          >
            {BRAND.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
