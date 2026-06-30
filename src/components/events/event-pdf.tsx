"use client";

import { forwardRef } from "react";
import { format } from "date-fns";
import {
  CalendarDays,
  User,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";

import type { Event } from "@/db/schema";

interface EventPdfProps {
  event: Event & {
    description?: string | null;
    speakerIntroduction?: string | null;
  };
}

const Placeholder = ({
  value,
  placeholder,
}: {
  value?: string | null;
  placeholder: string;
}) => {
  if (!value?.trim()) {
    return (
      <p className="text-sm italic text-neutral-500">
        {placeholder}
      </p>
    );
  }

  return (
    <p className="text-sm whitespace-pre-wrap text-neutral-700">
      {value}
    </p>
  );
};

export const EventPdf = forwardRef<HTMLDivElement, EventPdfProps>(
  ({ event }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white p-12 text-neutral-900"
      >
        <header className="border-b pb-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
            OnferenceTV
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {event.eventName}
          </h1>

          <p className="mt-2 text-neutral-500">
            Onference Event Summary
          </p>
        </header>

        <section className="mt-2">
          <h2 className="mb-2 text-lg font-semibold">
            Event Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <CalendarDays size={18} />
                <span className="font-semibold">
                  Event Date
                </span>
              </div>

              <p>
                {format(
                  event.eventDate,
                  "EEEE, dd MMMM yyyy"
                )}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <User size={18} />
                <span className="font-semibold">
                  Speaker
                </span>
              </div>

              <p>{event.speakerName}</p>
            </div>

            <div className="col-span-2">
              <div className="mb-2 flex items-center gap-2">
                <Briefcase size={18} />
                <span className="font-semibold">
                  Designation
                </span>
              </div>

              <p>{event.speakerDesignation}</p>
            </div>
          </div>
        </section>

        {/* Description */}

        <section className="mt-2 border-t pt-6">
          <div className="mb-2 flex items-center gap-2">
            <FileText size={18} />
            <h2 className="text-lg font-semibold">
              Event Description
            </h2>
          </div>

          <Placeholder
            value={event.description}
            placeholder="No event description has been generated."
          />
        </section>

        {/* Speaker Intro */}

        <section className="mt-2 border-t pt-6">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={18} />
            <h2 className="text-lg font-semibold">
              Speaker Introduction
            </h2>
          </div>

          <Placeholder
            value={event.speakerIntro}
            placeholder="No speaker introduction has been generated."
          />
        </section>

        {/* Footer */}

        <footer className="mt-2 border-t pt-4 text-sm text-neutral-500">
          <div className="flex justify-between">
            <span>
              Generated on{" "}
              {format(new Date(), "dd MMM yyyy, hh:mm a")}
            </span>

            <span>
              ConferenceTV Event Management
            </span>
          </div>
        </footer>
      </div>
    );
  }
);

EventPdf.displayName = "EventPdf";