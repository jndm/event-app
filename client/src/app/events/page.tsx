import { trpc } from "@client/lib/trpc";
import NewEventForm from "./(components)/newEventForm";
import DeleteEventButton from "./(components)/deleteFormButton";
import { unstable_cache } from "next/cache";

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
          <div key={event.event_id} className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {event.name}
            </h2>
            <div className="flex flex-row justify-between">
              <p className="text-lg">{event.event_id}</p>
              <p className="text-lg">{event.description}</p>
              <DeleteEventButton eventId={event.event_id}></DeleteEventButton>
            </div>
            {index !== events.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
