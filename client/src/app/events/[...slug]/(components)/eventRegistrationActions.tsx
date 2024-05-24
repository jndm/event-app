"use client";

import { Button } from "@client/components/ui/button";
import { useToast } from "@client/components/ui/use-toast";
import { EventRegistrationType } from "@server/database/tables/event-registration";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@client/components/ui/dialog";
import { useState } from "react";
import { Label } from "@client/components/ui/label";
import { Input } from "@client/components/ui/input";
import { InfoIcon } from "lucide-react";

export default function EventRegistrationActions(props: {
  eventEncryptedId: string;
  salt: string;
}) {
  const { toast } = useToast();

  const [registrationType, setRegistrationType] =
    useState<EventRegistrationType>(EventRegistrationType.Attend);

  const getRegistrationTypeText = (registrationType: EventRegistrationType) => {
    switch (registrationType) {
      case EventRegistrationType.Attend:
        return "Attend";
      case EventRegistrationType.Rejected:
        return "Reject";
      default:
        return "Unknown";
    }
  };

  return (
    <Dialog>
      <div className="flex justify-end items-end space-x-2">
        <DialogTrigger asChild>
          <Button
            onClick={() => setRegistrationType(EventRegistrationType.Attend)}
          >
            Attend
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => setRegistrationType(EventRegistrationType.Rejected)}
          >
            Reject
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getRegistrationTypeText(registrationType)}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-row gap-2">
            <InfoIcon className="w-24" />
            <div>
              Note: Without logging in event attending status will only be
              stored to browser local storage. If you want to keep list of
              events you are attending, please log in.
            </div>
          </div>
        </DialogDescription>
        <div className="flex flex-row justify-center items-center gap-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="" />
        </div>
        <DialogFooter>
          <Button variant={"outline"}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
