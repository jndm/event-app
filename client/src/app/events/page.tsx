import { trpc } from "@client/lib/trpc";
import NewEventForm from "./(components)/newEventForm";
import DeleteEventButton from "./(components)/deleteFormButton";
import { unstable_cache } from "next/cache";
import { format } from "date-fns";

export default async function EventsPage() {
  console.log("EventsPage init");

  const events = await unstable_cache(
    async () => trpc.events.getAll.query(),
    ["all-events"],
    { tags: ["all-events"] }
  )();

  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Events
      </h1>

      <NewEventForm />

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.eventId} className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {event.name}
            </h2>
            <div className="flex flex-col justify-between">
              <p className="text-lg">{event.eventId}</p>
              <p className="text-lg">{event.description}</p>
              <p className="text-lg">
                Starting:{" "}
                {format(new Date(event.eventStart), "dd.MM.yyyy HH:mm")}
              </p>
              <p className="text-lg">
                Ending:{" "}
                {!!event.eventEnd
                  ? format(new Date(event.eventEnd), "dd.MM.yyyy HH:mm")
                  : "-"}
              </p>
              <DeleteEventButton eventId={event.eventId}></DeleteEventButton>
            </div>
            {index !== events.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
