"use client";

import { Button } from "@client/components/ui/button";
import { deleteEvent } from "../(actions)/event.actions";
import { useToast } from "@client/components/ui/use-toast";
import { Trash2 } from "lucide-react";

export default function DeleteEventButton(props: { eventId: number }) {
  const { toast } = useToast();

  async function handleDelete(eventId: number) {
    console.log("eventid");

    const success = await deleteEvent(eventId);

    if (!success) {
      toast({
        title: "Event deletion failed.",
        description: "Please try again later.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    toast({ title: "Event deleted successfully.", duration: 4000 });
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => handleDelete(props.eventId)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
