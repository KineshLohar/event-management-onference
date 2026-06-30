import { format } from "date-fns";
import {
  Briefcase,
  CalendarDays,
  FileText,
  Mic2,
  Sparkles,
  User,
} from "lucide-react";

import type { Event } from "@/db/schema";

import { DetailItem } from "./detail-item";
import { DetailSection } from "./detail-section";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="space-y-6 pb-6">
      <DetailSection
        title="Event Information"
        description="General information about the conference event."
        icon={<Mic2 className="h-5 w-5" />}
      >
        <DetailItem
          icon={<Mic2 className="h-4 w-4 text-muted-foreground" />}
          label="Event Name"
          value={event.eventName}
        />

        <DetailItem
          icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
          label="Event Date"
          value={format(event.eventDate, "EEEE, dd MMMM yyyy")}
        />
      </DetailSection>

      <DetailSection
        title="Speaker"
        description="Information about the featured speaker."
        icon={<User className="h-5 w-5" />}
      >
        <DetailItem
          icon={<User className="h-4 w-4 text-muted-foreground" />}
          label="Speaker Name"
          value={event.speakerName}
        />

        <DetailItem
          icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
          label="Speaker Designation"
          value={event.speakerDesignation}
        />
      </DetailSection>

      <DetailSection
        title="AI Generated Event Description"
        description="A concise description generated for this event."
        icon={<FileText className="h-5 w-5" />}
        className="space-y-4"
      >
        <DetailItem
          className="md:col-span-2"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          label="Description"
          value={event.description}
          placeholder="No event description has been generated yet."
        />
      </DetailSection>

      <DetailSection
        title="AI Generated Speaker Introduction"
        description="A short professional introduction for the speaker."
        icon={<Sparkles className="h-5 w-5" />}
        className="space-y-4"
      >
        <DetailItem
          className="md:col-span-2"
          icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
          label="Introduction"
          value={event.speakerIntro}
          placeholder="No speaker introduction has been generated yet."
        />
      </DetailSection>
    </div>
  );
}