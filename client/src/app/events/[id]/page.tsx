import { trpc } from "@client/lib/trpc";
import { unstable_cache } from "next/cache";
import DeleteEventButton from "../(components)/deleteFormButton";
import { format } from "date-fns";
import { Event } from "@server/events/schemas/event.schema";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const getEvent = async (id: string) => {
    try {
      return await unstable_cache(
        async () => trpc.events.get.query(parseInt(id)),
        [`event-${id}`],
        { tags: [`event-${id}`] }
      )();
    } catch (error) {
      return undefined;
    }
  };

  const event = await getEvent(params.id);

  if (!event) {
    return notFound();
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Event Page
      </h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{event.name}</h2>
        <div className="flex flex-col justify-between">
          <p className="text-lg">{event.eventId}</p>
          <p className="text-lg">{event.description}</p>
          <p className="text-lg">
            Starting: {format(new Date(event.eventStart), "dd.MM.yyyy HH:mm")}
          </p>
          <p className="text-lg">
            Ending:{" "}
            {!!event.eventEnd
              ? format(new Date(event.eventEnd), "dd.MM.yyyy HH:mm")
              : "-"}
          </p>
          <DeleteEventButton eventId={event.eventId}></DeleteEventButton>
        </div>
      </div>
    </div>
  );
}
