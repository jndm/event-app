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
import { useMediaQuery } from "@client/app/(hooks)/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@client/components/ui/drawer";
import { EventRegistrationForm } from "./eventRegistrationForm";

export default function EventRegistrationActions(props: {
  eventEncryptedId: string;
  salt: string;
}) {
  const { toast } = useToast();

  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const getRegistrationDescription = () => {
    return (
      <div className="flex flex-row gap-2 text-sm text-muted-foreground">
        <InfoIcon className="w-24" />
        <div>
          Note: Without logging in event attending status will only be stored to
          browser local storage. If you want to keep list of events you are
          attending, please log in.
        </div>
      </div>
    );
  };

  if (isDesktop) {
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
              onClick={() =>
                setRegistrationType(EventRegistrationType.Rejected)
              }
            >
              Reject
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {getRegistrationTypeText(registrationType)}
            </DialogTitle>
          </DialogHeader>
          {getRegistrationDescription()}
          <EventRegistrationForm />
          <DialogFooter>
            <Button variant={"outline"}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          onClick={() => setRegistrationType(EventRegistrationType.Attend)}
        >
          Attend
        </Button>
      </DrawerTrigger>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => setRegistrationType(EventRegistrationType.Rejected)}
        >
          Reject
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{getRegistrationTypeText(registrationType)}</DrawerTitle>
          {getRegistrationDescription()}
        </DrawerHeader>
        <EventRegistrationForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
