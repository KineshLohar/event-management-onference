

import { CreateEventButton } from "@/components/create-event-button";
import { EventTable } from "@/components/events/event-table";
import { EventsPagination } from "@/components/events/events-pagination";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { events } from "@/db/schema";
import { asc, count } from "drizzle-orm";
import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic"; // always rendered per-request, never statically cached

const PAGE_SIZE = 10;

interface DashboardPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { page } = await searchParams;

  const requestedPage = Math.max(
    Number(page ?? 1),
    1
  );
  const [{ count: totalEvents }] = await db
    .select({
      count: count(),
    })
    .from(events);

  const totalPages = Math.max(
    Math.ceil(totalEvents / PAGE_SIZE),
    1
  );

  if (requestedPage > totalPages && totalEvents > 0) {
    redirect(`/?page=${totalPages}`);
  }

  // Clamp page
  const currentPage = Math.min(
    requestedPage,
    totalPages
  );

  const offset = (currentPage - 1) * PAGE_SIZE;

  // Fetch page
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(asc(events.eventDate))
    .limit(PAGE_SIZE)
    .offset(offset);

  const start =
    totalEvents === 0
      ? 0
      : offset + 1;

  const end =
    totalEvents === 0
      ? 0
      : Math.min(offset + PAGE_SIZE, totalEvents);


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

          <EventsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalEvents={totalEvents}
            start={start}
            end={end}
          />
        </div>
      </main>
    </>
  );
}