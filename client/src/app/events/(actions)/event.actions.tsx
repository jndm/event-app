"use server";

import { trpc } from "@client/lib/trpc";
import { EventCreateInput } from "@server/events/schemas/event.schema";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const sendCreateEvent = async (values: EventCreateInput) => {
  try {
    return await trpc.events.add.mutate(values);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function createEvent(values: EventCreateInput) {
  // For some reason (apparently a bug in redirect) it does not work if surrounded with try/catch so call separate function
  const created = await sendCreateEvent(values);

  if (!created) {
    return "Failed to create event";
  }

  redirect(`/events/${created.eventId}`);
}

export async function deleteEvent(eventId: number) {
  try {
    await trpc.events.delete.mutate({ eventId });
    revalidateTag("all-events");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
