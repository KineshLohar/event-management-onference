

import { CreateEventButton } from "@/components/create-event-button";
import { EventTable } from "@/components/event-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { events } from "@/db/schema";

export const dynamic = "force-dynamic"; // always rendered per-request, never statically cached

export default async function DashboardPage() {
  const allEvents = await db.select().from(events).orderBy(events.eventDate);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          / events
        </span>
      </header>

      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Events
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your conference events and speakers
              </p>
            </div>
            <CreateEventButton />
          </div>

          <EventTable events={allEvents} />
        </div>
      </main>
    </>
  );
}