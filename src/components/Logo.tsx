import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
}

function LogoMark({ light }: { light: boolean }) {
  const navy = "#0E3D3A";
  const copper = "#E07A2F";
  const paper = "#F3EFE6";

  const disc = light ? copper : navy;
  const ring = light ? navy : copper;
  const line = light ? navy : paper;
  const node = light ? navy : copper;

  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
      aria-hidden
    >
      <circle cx="24" cy="24" r="23" fill={disc} />
      <circle
        cx="24"
        cy="24"
        r="19.25"
        fill="none"
        stroke={ring}
        strokeWidth="1.35"
      />
      {/* Three ports on the ring */}
      <circle cx="24" cy="4.8" r="1.35" fill={ring} />
      <circle cx="40.6" cy="33.2" r="1.35" fill={ring} />
      <circle cx="7.4" cy="33.2" r="1.35" fill={ring} />
      {/* S-curve: corridor / switch */}
      <path
        d="M17.5 15.5 C17.5 11.8 30.5 11.8 30.5 17.2 C30.5 22.4 17.5 22.6 17.5 28.4 C17.5 34.2 30.5 34.2 30.5 30.4"
        fill="none"
        stroke={line}
        strokeWidth="2.35"
        strokeLinecap="round"
      />
      {/* Energy / hub node */}
      <circle cx="24" cy="24" r="3.1" fill={node} />
      <circle cx="24" cy="24" r="1.15" fill={light ? copper : paper} />
    </svg>
  );
}

export function Logo({
  variant = "light",
  className,
  showTagline = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label={`${BRAND.name} home`}
      className={cn("flex items-center gap-3", className)}
    >
      <LogoMark light={isLight} />
      <span className="leading-none">
        <span className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-[1.05rem] font-semibold tracking-tight sm:text-lg",
              isLight ? "text-white" : "text-navy"
            )}
          >
            MGE
          </span>
          <span
            className={cn(
              "text-[0.7rem] font-bold uppercase tracking-[0.22em] sm:text-[0.72rem]",
              isLight ? "text-white" : "text-gold"
            )}
          >
            Switch
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 block text-[9px] font-medium uppercase tracking-[0.16em]",
              isLight ? "text-white/55" : "text-muted"
            )}
          >
            {BRAND.shortTagline}
          </span>
        )}
      </span>
    </Link>
  );
}
