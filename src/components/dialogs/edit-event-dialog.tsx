"use client";

import type { Event } from "@/db/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventForm } from "../event-form";

interface EditEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
}

export function EditEventDialog({
  open,
  onOpenChange,
  event,
}: EditEventDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-6 py-5 gap-1">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Edit Event
          </DialogTitle>

          <DialogDescription>
            Update the event information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <EventForm
          mode="edit"
          event={event}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}