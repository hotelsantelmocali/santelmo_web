import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetail from "@/components/events/EventDetail";
import EventsLoading from "@/components/events/EventsLoading";
import { getEvent } from "@/lib/events";
import { getEventMetadata } from "@/lib/event-metadata";

type EventPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { uid } = await params;
  const event = await getEvent(uid, "es");

  if (!event?.data.start_date || !event.data.title) notFound();

  return getEventMetadata(event, "es");
}

async function EventoContent({ params }: EventPageProps) {
  const { uid } = await params;
  const event = await getEvent(uid, "es");

  if (!event?.data.start_date || !event.data.title) notFound();

  return <EventDetail event={event} locale="es" />;
}

export default function EventoPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<EventsLoading locale="es" />}>
      <EventoContent params={params} />
    </Suspense>
  );
}
