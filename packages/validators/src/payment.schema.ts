import { z } from "zod";

export const paymentSchema = z.object({
  invoice_id: z.string().uuid("Invalid invoice ID"),
  method: z.enum([
    "EASYPAISA", "JAZZCASH", "IBAN", "WISE", "PAYONEER", 
    "NSAVE", "ELEVATE", "USDT", "USDC", "BTC", "TWOCHECKOUT"
  ]),
  currency_paid: z.enum(["PKR", "USD", "EUR", "USDT", "USDC", "BTC"]),
  amount_paid: z.number().positive("Amount must be positive"),
  iban_number: z.string().optional(),
  mobile_number: z.string().optional(),
  crypto_wallet: z.string().optional(),
  transaction_ref: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
