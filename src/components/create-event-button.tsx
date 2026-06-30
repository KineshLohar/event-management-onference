"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventForm } from "@/components/event-form";
import { cn } from "@/lib/utils";

export function CreateEventButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "h-10 border-2 border-foreground bg-primary font-medium text-primary-foreground",
            " transition-all duration-100",
          )}
        >
          <Plus className="h-4 w-4" />
          <span className="ml-2 hidden sm:block">Create event</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
    sm:max-w-xl p-0
  "
      >
        <DialogHeader className="border-b px-6 py-5 gap-0">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Create event
          </DialogTitle>

          <DialogDescription className="max-w-md text-sm text-muted-foreground">
            Add a conference event along with speaker details.
          </DialogDescription>
        </DialogHeader>

        <EventForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}