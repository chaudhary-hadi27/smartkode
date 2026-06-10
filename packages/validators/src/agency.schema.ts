import { z } from "zod";

export const agencySchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  country: z.string().optional(),
});

export type AgencyInput = z.infer<typeof agencySchema>;
