declare module "@paystack/inline-js" {
  interface PaystackTransaction {
    reference: string;
    trans?: string;
    status?: string;
  }

  interface PaystackPopOptions {
    key: string;
    email: string;
    amount: number;
    reference: string;
    access_code?: string;
    currency?: string;
    onSuccess: (transaction: PaystackTransaction) => void;
    onCancel?: () => void;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackPopOptions): void;
  }
}
