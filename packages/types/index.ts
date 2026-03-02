import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

export type Contact = z.infer<typeof ContactSchema>;
