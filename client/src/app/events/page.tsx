import NewEventForm from "./(components)/newEventForm";

export default async function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Events
      </h1>

      <NewEventForm />
    </div>
  );
}
