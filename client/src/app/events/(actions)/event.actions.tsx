"use server";
import { trpc } from "@client/lib/trpc";
import { EventCreateInput } from "@server/events/schemas/event.schema";
import { revalidatePath } from "next/cache";

export default async function createEvent(values: EventCreateInput) {
  try {
    await trpc.events.add.mutate(values);
    revalidatePath("/events");
    return true;
  } catch (error) {
    return false;
  }
}
