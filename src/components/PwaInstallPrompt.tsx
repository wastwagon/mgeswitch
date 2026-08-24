"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PwaInstallPromptProps {
  hasBottomNav?: boolean;
}

export function PwaInstallPrompt({ hasBottomNav = true }: PwaInstallPromptProps) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mgeswitch:pwa-dismissed")) {
      queueMicrotask(() => setDismissed(true));
      return;
    }

    function onInstall(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", onInstall);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  if (!deferred || dismissed) return null;

  async function install() {
    await deferred!.prompt();
    const { outcome } = await deferred!.userChoice;
    if (outcome === "accepted") setDeferred(null);
    setDismissed(true);
    sessionStorage.setItem("mgeswitch:pwa-dismissed", "1");
  }

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem("mgeswitch:pwa-dismissed", "1");
  }

  return (
    <div
      className={
        hasBottomNav
          ? "fixed inset-x-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom)+0.75rem)] z-50 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm"
          : "fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm"
      }
    >
      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-navy p-4 shadow-2xl">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold">
          <Download className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Add to Home Screen</p>
          <p className="mt-0.5 text-xs text-white/70">
            Install MGE-SWITCH for quick access to ports, supply services,
            and contact details.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={install}
              className="min-h-[44px] flex-1 rounded-xl bg-gold px-4 text-xs font-bold uppercase tracking-wider text-white"
            >
              Install
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="min-h-[44px] rounded-xl px-3 text-white/60"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
