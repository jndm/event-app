"use server";

import { trpc } from "@client/lib/trpc";
import { EventCreateInput } from "@server/events/schemas/event.schema";
import { revalidatePath } from "next/cache";

export async function createEvent(values: EventCreateInput) {
  try {
    await trpc.events.add.mutate(values);
    revalidatePath("/events");
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteEvent(eventId: number) {
  console.log("deleting" + eventId);

  try {
    await trpc.events.delete.mutate({ eventId });
    revalidatePath("/events");
    return true;
  } catch (error) {
    return false;
  }
}
