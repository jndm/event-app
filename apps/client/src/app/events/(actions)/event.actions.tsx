"use server";

import { trpc } from "@client/lib/trpc";
import { EventCreateInput } from "@schema/event.schema";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const sendCreateEvent = async (values: EventCreateInput) => {
  try {
    return await trpc.events.add.mutate(values);
  } catch (error) {
    return undefined;
  }
};

const sendDeleteEvent = async (encryptedId: string, salt: string) => {
  try {
    await trpc.events.delete.mutate({ encryptedId, salt });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function createEvent(values: EventCreateInput) {
  // For some reason (apparently a bug in redirect) it does not work if surrounded with try/catch so call separate function
  const created = await sendCreateEvent(values);

  if (!created) {
    return "Failed to create event";
  }

  redirect(`/events/${created.encryptedId}/${created.salt}`);
}

export async function deleteEvent(encryptedId: string, salt: string) {
  const success = await sendDeleteEvent(encryptedId, salt);

  if (!success) {
    return "Failed to create event";
  }

  revalidateTag(`event-${encryptedId}-${salt}`);
  redirect(`/events`);
}
