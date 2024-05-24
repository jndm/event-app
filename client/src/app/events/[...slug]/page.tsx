import { trpc } from "@client/lib/trpc";
import { unstable_cache } from "next/cache";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import DeleteEventButton from "./(components)/deleteFormButton";
import Image from "next/image";
import { CalendarClockIcon, MapPinIcon, UserCheck } from "lucide-react";
import { Separator } from "@client/components/ui/separator";
import { Button } from "@client/components/ui/button";
import EventRegistrationActions from "./(components)/eventRegistrationActions";

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
        { revalidate: false, tags: [`event-${encryptedId}-${salt}`] }
      )();
    } catch (error) {
      return undefined;
    }
  };

  const event = await getEvent(encryptedId, salt);

  if (!event) {
    return notFound();
  }

  function handleAttendingClick(): void {}

  return (
    <div>
      <div className="relative h-60">
        <Image
          src={"/img/tmp/event-logo.png"}
          alt={"Temporary 'logo' for event"}
          fill={true}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
        {event.name}
      </h1>

      <Separator orientation="horizontal" className="my-4" />

      <div className="flex flex-row justify-between space-y-2 flex-wrap sm:flex-row">
        <div className="space-y-2">
          <div className="flex space-x-2">
            <CalendarClockIcon className="h-6 w-6" />
            <div className="text-lg">
              {format(new Date(event.eventStart), "dd.MM.yyyy HH:mm")}
              {!!event.eventEnd
                ? " - " + format(new Date(event.eventEnd), "dd.MM.yyyy HH:mm")
                : ""}
            </div>
          </div>

          <div className="flex space-x-2">
            <MapPinIcon className="h-6 w-6" />
            <div className="text-lg">Location</div>
          </div>

          <div className="flex space-x-2">
            <UserCheck className="h-6 w-6" />
            <div className="text-lg">23 people attending</div>
          </div>
        </div>

        <div className="flex justify-end items-end">
          <EventRegistrationActions />
        </div>
      </div>

      <Separator orientation="horizontal" className="my-4" />

      <div className="text-lg">{event.description}</div>

      <DeleteEventButton
        eventEncryptedId={encryptedId}
        salt={salt}
      ></DeleteEventButton>
    </div>
  );
}
