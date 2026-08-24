"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [booking, setBooking] = useState<{
    reference: string;
    quotedPrice: string | number;
    customerName: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") ?? params.get("trxref");

    if (!reference) {
      queueMicrotask(() => setStatus("failed"));
      return;
    }

    fetch(`/api/payments/paystack?reference=${encodeURIComponent(reference)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.paid && data.booking) {
          setBooking(data.booking);
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-blue-bg px-4 safe-top safe-bottom">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-navy" />
            <p className="mt-4 font-medium text-navy">Confirming your payment…</p>
          </>
        )}

        {status === "success" && booking && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h1 className="mt-4 text-xl font-bold text-navy">Payment Successful</h1>
            <p className="mt-2 text-sm text-muted">
              Booking{" "}
              <span className="font-mono font-semibold text-navy">
                {booking.reference}
              </span>{" "}
              is confirmed.
            </p>
            <p className="mt-2 text-2xl font-bold text-gold">
              {formatCurrency(Number(booking.quotedPrice))}
            </p>
            <p className="mt-4 text-sm text-muted">
              A confirmation will be sent to your email. Our driver will contact
              you before pickup.
            </p>
            <Link
              href="/booking/status"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-navy text-sm font-semibold text-white active:scale-[0.98]"
            >
              Track Your Booking
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-500" />
            <h1 className="mt-4 text-xl font-bold text-navy">Payment Issue</h1>
            <p className="mt-2 text-sm text-muted">
              We couldn&apos;t confirm your payment. If you were charged, contact
              us on WhatsApp and we&apos;ll resolve it immediately.
            </p>
            <Link
              href="/book"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-gold text-sm font-bold text-white active:scale-[0.98]"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
