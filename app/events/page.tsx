import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import EventsListing from "@/components/events/EventsListing";
import EventsLoading from "@/components/events/EventsLoading";
import { getEvents } from "@/lib/events";
import { getEventsLandingMetadata } from "@/lib/event-metadata";

export const metadata: Metadata = getEventsLandingMetadata("en");

async function EventsContent() {
  await connection();
  const events = await getEvents("en");

  return <EventsListing locale="en" events={events} />;
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsLoading locale="en" />}>
      <EventsContent />
    </Suspense>
  );
}
