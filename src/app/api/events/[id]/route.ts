
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { flattenError } from "zod";

import { db } from "@/db";
import { events } from "@/db/schema";
import { eventSchema } from "@/lib/event.validation";
import { eq } from "drizzle-orm";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const [event] = await db
            .select()
            .from(events)
            .where(eq(events.id, id));

        if (!event) {
            return NextResponse.json(
                {
                    success: false,
                    error: "NOT_FOUND",
                    message: "Event not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: event,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET /api/events/[id] failed:", error);

        return NextResponse.json(
            {
                success: false,
                error: "INTERNAL_SERVER_ERROR",
                message: "Unable to fetch event.",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        let body: any;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    error: "INVALID_JSON",
                    message: "Request body must be valid JSON.",
                },
                { status: 400 }
            );
        }

        const payload = {
            ...body,
            eventDate: new Date(body.eventDate),
        };

        const parsed = eventSchema.safeParse(payload);

        if (!parsed.success) {
            const { fieldErrors } = flattenError(parsed.error);

            return NextResponse.json(
                {
                    success: false,
                    error: "VALIDATION_ERROR",
                    message: "Invalid input data.",
                    fields: fieldErrors,
                },
                { status: 400 }
            );
        }

        const [existingEvent] = await db
            .select()
            .from(events)
            .where(eq(events.id, id));

        if (!existingEvent) {
            return NextResponse.json(
                {
                    success: false,
                    error: "NOT_FOUND",
                    message: "Event not found.",
                },
                { status: 404 }
            );
        }

        const [updatedEvent] = await db
            .update(events)
            .set(parsed.data)
            .where(eq(events.id, id))
            .returning();

        revalidatePath("/");

        return NextResponse.json(
            {
                success: true,
                data: updatedEvent,
                message: "Event updated successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("PATCH /api/events/[id] failed:", error);

        return NextResponse.json(
            {
                success: false,
                error: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong while updating the event.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const [existingEvent] = await db
            .select()
            .from(events)
            .where(eq(events.id, id));

        if (!existingEvent) {
            return NextResponse.json(
                {
                    success: false,
                    error: "NOT_FOUND",
                    message: "Event not found.",
                },
                { status: 404 }
            );
        }

        await db
            .delete(events)
            .where(eq(events.id, id));

        revalidatePath("/");

        return NextResponse.json(
            {
                success: true,
                message: "Event deleted successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE /api/events/[id] failed:", error);

        return NextResponse.json(
            {
                success: false,
                error: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong while deleting the event.",
            },
            { status: 500 }
        );
    }
}