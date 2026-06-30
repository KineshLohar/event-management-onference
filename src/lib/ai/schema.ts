import { z } from "zod";

export const eventContentSchema = z.object({
  description: z
    .string()
    .min(50)
    .max(2500),

  speakerIntroduction: z
    .string()
    .min(30)
    .max(1500),
});

export type EventContent = z.infer<typeof eventContentSchema>;