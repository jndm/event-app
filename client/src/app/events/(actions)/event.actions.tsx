"use server";

import { trpc } from "@client/lib/trpc";
import { EventCreateInput } from "@server/events/schemas/event.schema";
import { format } from "date-fns";
import { revalidateTag } from "next/cache";

export async function createEvent(values: EventCreateInput) {
  try {
    console.log(values);
    console.log(new Date(format(values.eventStartDate, "yyyy-MM-dd")));
    await trpc.events.add.mutate({
      ...values,
      eventStartDate: new Date(),
    });
    revalidateTag("all-events");
    return true;
  } catch (error) {
    //console.error(error);
    return false;
  }
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
