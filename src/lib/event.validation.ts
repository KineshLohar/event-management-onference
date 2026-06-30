import { z } from "zod";

export const eventSchema = z.object({
  eventName: z.string().trim().min(1, "Event name is required").max(200),
  eventDate: z
    .date()
    .refine((d) => !isNaN(d.getTime()), { message: "Please select a valid event date" }),
  speakerName: z.string().trim().min(1, "Speaker name is required").max(150),
  speakerDesignation: z.string().trim().min(1, "Speaker designation is required").max(200),
});

export type EventFormValues = z.infer<typeof eventSchema>;

// Reused later for PATCH — all fields optional but still validated when present
export const updateEventSchema = eventSchema.partial();