"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { Event } from "@/db/schema";
import { api } from "@/lib/axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
}

export function DeleteEventDialog({
  open,
  onOpenChange,
  event,
}: DeleteEventDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const { data } = await api.delete(`/events/${event.id}`);

      toast.success(
        data.message ?? "Event deleted successfully."
      );

      router.refresh();

      onOpenChange(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
          case 404:
            toast.error(
              data?.message ?? "Event not found."
            );
            break;

          case 500:
            toast.error(
              data?.message ??
                "Unable to delete event."
            );
            break;

          default:
            toast.error(
              data?.message ??
                "Something went wrong."
            );
        }

        return;
      }

      console.error(error);

      toast.error(
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Event
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-3">
            <span className="block">
              Are you sure you want to delete this event?
            </span>

            <span className="block rounded-md border bg-muted p-3 font-medium text-foreground">
              {event.eventName}
            </span>

            <span className="block">
              This action cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            variant="destructive"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}