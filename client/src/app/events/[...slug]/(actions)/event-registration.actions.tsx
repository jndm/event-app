"use server";

import { trpc } from "@client/lib/trpc";
import { EventRegistrationAddInput } from "@server/events/schemas/event-registration.schema";

const sendEventRegistration = async (
  eventRegistration: EventRegistrationAddInput
) => {
  try {
    return await trpc.events.addEventRegistration.mutate(eventRegistration);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function createEventRegistration(
  values: EventRegistrationAddInput
) {
  const created = await sendEventRegistration(values);

  if (!created) {
    return "Failed to send event registration";
  }
}
