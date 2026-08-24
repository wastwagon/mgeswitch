"use client";

import {
  LayoutDashboard,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Settings,
  CreditCard,
  Plus,
  ImageIcon,
  BookOpen,
  Car,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/use-scroll-lock";

const navItems = [
  { href: "/admin", label: "Requests", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings/new", label: "New Request", icon: Plus },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/corporate", label: "Corporate", icon: Briefcase },
  { href: "/admin/fleet", label: "Fleet", icon: Car },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/cms", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminShellProps {
  userEmail: string;
  newCorporateCount?: number;
  children: React.ReactNode;
}

function pageTitle(pathname: string) {
  if (pathname.startsWith("/admin/bookings/new")) return "New Request";
  if (pathname.includes("/edit")) return "Edit Request";
  if (pathname.startsWith("/admin/payments")) return "Payments";
  if (pathname.startsWith("/admin/corporate")) return "Corporate";
  if (pathname.startsWith("/admin/fleet")) return "Fleet";
  if (pathname.startsWith("/admin/blog")) return "Blog";
  if (pathname.startsWith("/admin/media")) return "Media";
  if (pathname.startsWith("/admin/cms")) return "Content";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  return "Requests";
}

export function AdminShell({
  userEmail,
  newCorporateCount = 0,
  children,
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useScrollLock(sidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col bg-navy transition-transform duration-300 ease-out safe-top safe-bottom lg:static lg:w-64 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <Logo variant="light" showTagline={false} />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              Operations
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="touch-target flex items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-4">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex min-h-[48px] items-center gap-3 px-4 text-sm font-medium transition active:scale-[0.98]",
                  active
                    ? "bg-gold text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="min-w-0 flex-1">{item.label}</span>
                {item.href === "/admin/corporate" && newCorporateCount > 0 && (
                  <span
                    className={cn(
                      "ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums",
                      active ? "bg-white/20 text-white" : "bg-gold text-white"
                    )}
                  >
                    {newCorporateCount > 99 ? "99+" : newCorporateCount}
                  </span>
                )}
              </Link>
            );
          })}
          <Link
            href="/"
            target="_blank"
            className="flex min-h-[48px] items-center gap-3 px-4 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View Website
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate px-2 text-xs text-white/50">{userEmail}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-3 flex min-h-[48px] w-full items-center gap-2 px-4 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur-xl safe-top sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="touch-target flex items-center justify-center text-navy lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                {pageTitle(pathname)}
              </p>
              <p className="truncate text-xs text-navy lg:hidden">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-xs text-muted lg:block">
              {userEmail}
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-green-700">
              Live
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
