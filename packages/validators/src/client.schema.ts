import { z } from "zod";

export const clientSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  company_name: z.string().optional(),
  whatsapp: z.string().optional(),
  email_contact: z.string().email("Invalid email").optional(),
  country: z.string().optional(),
  client_type: z.enum(["LOCAL", "INTERNATIONAL"]).default("INTERNATIONAL"),
  preferred_currency: z.enum(["PKR", "USD", "EUR", "USDT", "USDC", "BTC"]).default("USD"),
  preferred_payment: z.enum([
    "EASYPAISA", "JAZZCASH", "IBAN", "WISE", "PAYONEER", 
    "NSAVE", "ELEVATE", "USDT", "USDC", "BTC", "TWOCHECKOUT"
  ]).default("WISE"),
});

export type ClientInput = z.infer<typeof clientSchema>;
