"use client";

import type { Event } from "@/db/schema";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { EventDetails } from "./event-details";

interface ViewEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Event & {
        description?: string | null;
        speakerIntroduction?: string | null;
    };
}

export function ViewEventDialog({
    open,
    onOpenChange,
    event,
}: ViewEventDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 sm:max-w-4xl gap-0">

                <DialogHeader className="border-b p-5 gap-0">
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Event Details
                    </DialogTitle>

                    <DialogDescription>
                        View complete information about this conference event.
                    </DialogDescription>
                </DialogHeader>

                {/* Content */}

                <ScrollArea className="max-h-[70vh]">
                    <div className="px-4 my-4">
                        <EventDetails event={event} />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}