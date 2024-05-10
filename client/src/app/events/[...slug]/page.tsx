import { trpc } from "@client/lib/trpc";
import { unstable_cache } from "next/cache";
import DeleteEventButton from "../(components)/deleteFormButton";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const encryptedId = params.slug[0];
  const salt = params.slug[1];

  const getEvent = async (encryptedId: string, salt: string) => {
    try {
      return await unstable_cache(
        async () => trpc.events.get.query({ encryptedId, salt }),
        [`event-${encryptedId}-${salt}`],
        { tags: [`event-${encryptedId}-${salt}`] }
      )();
    } catch (error) {
      return undefined;
    }
  };

  const event = await getEvent(encryptedId, salt);

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
          <p className="text-lg">{event.encryptedId}</p>
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
          <DeleteEventButton
            eventEncryptedId={encryptedId}
            salt={salt}
          ></DeleteEventButton>
        </div>
      </div>
    </div>
  );
}
