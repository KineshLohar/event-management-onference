CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"event_name" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"speaker_name" text NOT NULL,
	"speaker_designation" text NOT NULL,
	"description" text,
	"speaker_intro" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
