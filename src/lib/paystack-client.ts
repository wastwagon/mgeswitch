export function getPaystackPublicKey(): string {
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
}

export function isPaystackEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
}

interface PaystackCheckoutParams {
  email: string;
  amountGhs: number;
  reference: string;
  accessCode?: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export async function openPaystackCheckout(params: PaystackCheckoutParams) {
  const publicKey = getPaystackPublicKey();
  if (!publicKey) {
    throw new Error("Paystack public key is not configured");
  }

  const { default: PaystackPop } = await import("@paystack/inline-js");
  const popup = new PaystackPop();
  popup.newTransaction({
    key: publicKey,
    email: params.email,
    amount: Math.round(params.amountGhs * 100),
    reference: params.reference,
    access_code: params.accessCode,
    currency: "GHS",
    onSuccess: (transaction) => {
      params.onSuccess(transaction.reference);
    },
    onCancel: params.onClose,
  });
}
