"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  ArrowRight,
  Mic2,
  User,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { EventFormValues, eventSchema } from "@/lib/event.validation";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Event } from "@/db/schema";

interface EventFormProps {
  mode: "create" | "edit";
  event?: Event;
  onSuccess?: () => void;
}

// Shared label style — mono, uppercase, widely tracked. Matches the
// sidebar's group-label treatment so the dialog reads as the same
// product, not a different design system glued on.
const labelClass =
  "flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground";

export function EventForm({ mode,
  event, onSuccess }: EventFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventName: "",
      speakerName: "",
      speakerDesignation: "",
      eventDate: new Date(),
    },
  });

  useEffect(() => {
    if (mode === "edit" && event) {
      reset({
        eventName: event.eventName,
        eventDate: new Date(event.eventDate),
        speakerName: event.speakerName,
        speakerDesignation: event.speakerDesignation,
      });

      return;
    }

    reset({
      eventName: "",
      eventDate: new Date(),
      speakerName: "",
      speakerDesignation: "",
    });
  }, [mode, event, reset]);

  const onSubmit = async (values: EventFormValues) => {
    setSubmitting(true);
    try {
      const response =
        mode === "create"
          ? await api.post("/events", values)
          : await api.patch(`/events/${event!.id}`, values);

      console.log("RESPOS", response);

      toast.success(response?.data?.message ? response.data.message :
        mode === "create"
          ? "Event created successfully."
          : "Event updated successfully."
      );

      if (mode === "create") {
        reset();
      }
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.log("ERROR ", error);

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
          case 400:
            toast.error(
              data?.message ??
              "Please review the form and try again."
            );
            break;

          case 404:
            toast.error("Event not found.");
            break;

          case 409:
            toast.error(
              data?.message ??
              "Unable to complete the request."
            );
            break;

          case 500:
            toast.error(
              data?.message ??
              "Something went wrong. Please try again."
            );
            break;

          default:
            toast.error(
              data?.message ??
              "Failed to save the event."
            );
        }
      } else {
        console.error("Failed to create event:", error);
        toast.error("Network error — please check your connection and try again");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 px-6 py-3 pb-6">
        <Controller
          name="eventName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                <Mic2 className="h-3.5 w-3.5" />
                Event name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Advances in Fetal Medicine"
                aria-invalid={fieldState.invalid}
                className="h-10"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="eventDate"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                <CalendarIcon className="h-3.5 w-3.5" />
                Event date
              </FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={field.name}
                    type="button"
                    variant="outline"
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "h-10 w-full justify-start border-input bg-transparent text-left font-normal",
                      "hover:bg-accent/40",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                    {field.value ? format(field.value, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-2 p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    autoFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="speakerName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                <User className="h-3.5 w-3.5" />
                Speaker name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Dr. Jane Smith"
                aria-invalid={fieldState.invalid}
                className="h-10"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="speakerDesignation"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                <Briefcase className="h-3.5 w-3.5" />
                Speaker designation
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Senior Consultant, ABC Hospital"
                aria-invalid={fieldState.invalid}
                className="h-10"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={submitting}
          className={cn(
            "group h-11 w-full border-2 border-foreground bg-primary font-medium text-primary-foreground flex items-center rounded-none hover:rounded",
            " transition-all duration-100 mt-4",
            "hover:bg-primary/90",
            "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
            submitting && "active:translate-x-0 active:translate-y-0"
          )}
        >
          {
            submitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : <>
                {mode === 'create' ? 'Create Event' : 'Edit Event'}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-all" />
              </>
          }
        </Button>
      </FieldGroup>
    </form>
  );
}