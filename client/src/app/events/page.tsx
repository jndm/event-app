import { trpc } from "@client/lib/trpc";
import NewEventForm from "./(components)/newEventForm";

export default async function EventsPage() {
  const events = await trpc.events.get_all.query();

  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Events
      </h1>

      <NewEventForm />

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {event.name}
            </h2>
            <p className="text-lg">{event.description}</p>
            {index !== events.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
