const PAYSTACK_BASE = "https://api.paystack.co";

export function getPaystackSecret(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return key;
}

export function getPaystackPublicKey(): string {
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
}

export function isPaystackConfigured(): boolean {
  return Boolean(
    process.env.PAYSTACK_SECRET_KEY &&
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  );
}

export function toPaystackAmount(ghs: number): number {
  return Math.round(ghs * 100);
}

interface InitializeParams {
  email: string;
  amountGhs: number;
  reference: string;
  metadata?: Record<string, string | number>;
  callbackUrl?: string;
}

export async function initializeTransaction(params: InitializeParams) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaystackSecret()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: toPaystackAmount(params.amountGhs),
      reference: params.reference,
      currency: "GHS",
      callback_url: params.callbackUrl,
      metadata: params.metadata,
      channels: ["card", "mobile_money", "bank"],
    }),
  });

  const data = await res.json();
  if (!data.status) {
    throw new Error(data.message ?? "Paystack initialization failed");
  }
  return data.data as {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${getPaystackSecret()}`,
      },
    }
  );

  const data = await res.json();
  if (!data.status) {
    throw new Error(data.message ?? "Paystack verification failed");
  }

  return data.data as {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
  };
}
