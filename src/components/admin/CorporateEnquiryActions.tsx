"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Loader2,
  MessageSquare,
  Play,
  X,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CorporateEnquiryActionsProps {
  enquiryId: string;
  status: string;
  size?: "default" | "large";
}

export function CorporateEnquiryActions({
  enquiryId,
  status,
  size = "default",
}: CorporateEnquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(updates: Record<string, string>) {
    setLoading(true);
    try {
      const res = await fetch(`/api/corporate/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Update failed");
      router.refresh();
    } catch {
      alert("Could not update enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader2 className="h-5 w-5 animate-spin text-muted" />;
  }

  const btnClass = cn(
    "flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition active:scale-[0.98]",
    size === "large"
      ? "min-h-[48px] flex-1 px-4 text-xs"
      : "px-3 py-2.5 text-[10px] min-h-[44px]"
  );

  return (
    <div className={cn("flex flex-wrap gap-2", size === "large" && "w-full")}>
      {status === "NEW" && (
        <button
          type="button"
          onClick={() => update({ status: "CONTACTED" })}
          className={cn(
            btnClass,
            "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          )}
        >
          <MessageSquare className="h-4 w-4" />
          Contacted
        </button>
      )}
      {(status === "NEW" || status === "CONTACTED") && (
        <button
          type="button"
          onClick={() => update({ status: "IN_PROGRESS" })}
          className={cn(
            btnClass,
            "border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
          )}
        >
          <Play className="h-4 w-4" />
          {size === "large" ? "In Progress" : "Progress"}
        </button>
      )}
      {status !== "CLOSED" && status !== "SPAM" && (
        <button
          type="button"
          onClick={() => update({ status: "CLOSED" })}
          className={cn(
            btnClass,
            "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
          )}
        >
          <Check className="h-4 w-4" />
          Close
        </button>
      )}
      {status !== "SPAM" && (
        <button
          type="button"
          onClick={() => update({ status: "SPAM" })}
          className={cn(
            btnClass,
            "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
            size !== "large" && "px-2.5"
          )}
          aria-label="Mark as spam"
        >
          <Ban className="h-4 w-4" />
          {size === "large" && "Spam"}
        </button>
      )}
      {status === "CLOSED" && (
        <button
          type="button"
          onClick={() => update({ status: "NEW" })}
          className={cn(btnClass, "border border-border bg-white text-muted")}
        >
          <X className="h-4 w-4" />
          Reopen
        </button>
      )}
    </div>
  );
}
