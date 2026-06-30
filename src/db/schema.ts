import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),

  eventName: text("event_name").notNull(),
  eventDate: timestamp("event_date", { mode: "date" }).notNull(),
  speakerName: text("speaker_name").notNull(),
  speakerDesignation: text("speaker_designation").notNull(),

  // AI-generated, nullable until "Generate" is clicked
  description: text("description"),
  speakerIntro: text("speaker_intro"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  aiGenerated: boolean("ai-generated").default(false)
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;