"use client";

import { Button } from "@client/components/ui/button";
import { useToast } from "@client/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { deleteEvent } from "@client/app/events/(actions)/event.actions";

export default function DeleteEventButton(props: {
  eventEncryptedId: string;
  salt: string;
}) {
  const { toast } = useToast();

  async function handleDelete(encryptedId: string, salt: string) {
    const errorMessage = await deleteEvent(encryptedId, salt);

    if (!!errorMessage) {
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
      onClick={() => handleDelete(props.eventEncryptedId, props.salt)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
