import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { flattenError, ZodError } from "zod";
import { eventSchema } from "@/lib/event.validation";
import { db } from "@/db";
import { events } from "@/db/schema";
import { generateEventContent } from "@/lib/ai/generate-event-content";

export async function GET() {
  try {
    const allEvents = await db.select().from(events).orderBy(events.eventDate);;
    return NextResponse.json(allEvents, { status: 200 });
  } catch (error) {
    console.error("GET /api/events failed:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {

    let body: any;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_JSON",
          message: "Request body must be valid JSON",
        },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      eventDate: new Date(body.eventDate)
    }

    const parsed = eventSchema.safeParse(payload);

    if (!parsed.success) {
      const { fieldErrors } = flattenError(parsed.error);

      return NextResponse.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Invalid input data",
          fields: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let description: string | null = null;
    let speakerIntro: string | null = null;
    let aiGenerated = false;

    try {
      const ai = await generateEventContent({
        eventName: data.eventName,
        eventDate: data.eventDate,
        speakerName: data.speakerName,
        speakerDesignation: data.speakerDesignation,
      });
      if (ai) {
        description = ai.description;
        speakerIntro = ai.speakerIntroduction;
        aiGenerated = true;
      }
    } catch (error) {
      console.error("AI generation failed:", error);
    }

    const [event] = await db.insert(events).values({
      ...data,
      description,
      speakerIntro,
      aiGenerated
    }).returning();

    revalidatePath("/");

    return NextResponse.json(
      {
        success: true,
        aiGenerated,
        message: aiGenerated
          ? "Event created successfully."
          : "Event created successfully. AI content could not be generated.",
        data: event,
      },
      { status: 201 }
    );
  } catch (error) {
    // -----------------------------
    // 6. Unexpected errors
    // -----------------------------
    console.error("POST /api/events failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while creating event",
      },
      { status: 500 }
    );
  }
}