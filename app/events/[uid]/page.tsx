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
  const event = await getEvent(uid, "en");

  if (!event?.data.start_date || !event.data.title) notFound();

  return getEventMetadata(event, "en");
}

async function EventContent({ params }: EventPageProps) {
  const { uid } = await params;
  const event = await getEvent(uid, "en");

  if (!event?.data.start_date || !event.data.title) notFound();

  return <EventDetail event={event} locale="en" />;
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<EventsLoading locale="en" />}>
      <EventContent params={params} />
    </Suspense>
  );
}
