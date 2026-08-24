"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Shield } from "lucide-react";
import { Logo } from "@/components/Logo";
import { IMAGES } from "@/lib/images";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen safe-top safe-bottom">
      <div className="relative hidden w-1/2 lg:block">
        <Image src={IMAGES.hero} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="light" />
          <div>
            <div className="mb-4 flex items-center gap-2 text-gold">
              <Shield className="h-5 w-5" />
              <span className="text-[11px] font-semibold uppercase tracking-widest">
                Admin Access
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-white">
              Manage bookings,
              <br />
              content, and operations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 safe-bottom">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo variant="dark" className="justify-center" />
          </div>
          <h1 className="font-display mt-8 text-center text-2xl font-bold text-navy">
            Admin Sign In
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Bookings dashboard & content management
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-8 space-y-3 text-center text-sm text-muted">
            <p>
              Looking for your booking?{" "}
              <Link href="/booking/status" className="font-medium text-navy underline">
                Track by reference
              </Link>
            </p>
            <p>
              <Link href="/" className="text-navy underline underline-offset-4">
                ← Return to homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
