import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import type { Event } from "@/db/schema";
import EventActions from "./event-actions";

export function EventTable({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <p className="text-sm font-medium">No events yet</p>
        <p className="text-sm text-muted-foreground">Create your first event to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.eventName}</TableCell>
              <TableCell>{format(event.eventDate, "PPP")}</TableCell>
              <TableCell>{event.speakerName}</TableCell>
              <TableCell>{event.speakerDesignation}</TableCell>
              <TableCell><EventActions event={event} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}