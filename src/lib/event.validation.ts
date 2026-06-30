import { z } from "zod";

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const eventSchema = z.object({
  eventName: z
    .string()
    .trim()
    .min(1, "Event name is required")
    .max(200, "Event name cannot exceed 200 characters"),

  eventDate: z
    .date({
      error: "Invalid date",
    })
    .refine((date) => date >= startOfToday(), {
      message: "Please select a future date",
    }),

  speakerName: z
    .string()
    .trim()
    .min(1, "Speaker name is required")
    .max(150, "Speaker name cannot exceed 150 characters"),

  speakerDesignation: z
    .string()
    .trim()
    .min(1, "Speaker designation is required")
    .max(200, "Speaker designation cannot exceed 200 characters"),
});

export type EventFormValues = z.infer<typeof eventSchema>;

export const updateEventSchema = eventSchema.partial();