import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import EventsListing from "@/components/events/EventsListing";
import EventsLoading from "@/components/events/EventsLoading";
import { getEvents } from "@/lib/events";
import { getEventsLandingMetadata } from "@/lib/event-metadata";

export const metadata: Metadata = getEventsLandingMetadata("es");

async function EventosContent() {
  await connection();
  const events = await getEvents("es");

  return <EventsListing locale="es" events={events} />;
}

export default function EventosPage() {
  return (
    <Suspense fallback={<EventsLoading locale="es" />}>
      <EventosContent />
    </Suspense>
  );
}
