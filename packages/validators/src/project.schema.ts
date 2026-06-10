import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["LARGE", "SMALL"]),
  total_value: z.number().positive("Total value must be positive"),
  client_id: z.string().uuid("Invalid client ID"),
  agency_id: z.string().uuid("Invalid agency ID").optional(),
  tech_id: z.string().uuid("Invalid tech ID").optional(),
  deadline: z.string().datetime().optional(), // ISO date string
});

export type ProjectInput = z.infer<typeof projectSchema>;
