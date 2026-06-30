import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { flattenError, ZodError } from "zod";
import { eventSchema } from "@/lib/event.validation";
import { db } from "@/db";
import { events } from "@/db/schema";

export async function GET() {
    try {
        const allEvents = await db.select().from(events).orderBy(events.eventDate);;
        return NextResponse.json(allEvents, { status: 200 });
    } catch (error) {
        console.error("GET /api/events failed:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
    }

    try {
        const data = eventSchema.parse(body);
        const [event] = await db.insert(events).values(data).returning();

        revalidatePath("/"); // invalidate cached dashboard so SSR reflects the new row

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {

            const { fieldErrors } = flattenError(error);
            return NextResponse.json(
                { error: "Validation failed", details: fieldErrors },
                { status: 400 }
            );
        }
        console.error("POST /api/events failed:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}