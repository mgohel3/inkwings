import { z } from "zod";

export const enquirySchema = z
  .object({
    name: z.string().trim().min(1, "Please add your name."),
    company: z.string().trim().optional().default(""),
    phone: z.string().trim().optional().default(""),
    email: z.string().trim().optional().default(""),
    need: z.string().trim().optional().default(""),
    message: z.string().trim().optional().default(""),
  })
  .refine((data) => data.phone.length > 0 || data.email.length > 0, {
    message: "Add a phone number or an email so we can reply.",
    path: ["phone"],
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;
