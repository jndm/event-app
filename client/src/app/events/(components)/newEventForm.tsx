"use client";

import { Button } from "@client/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EventCreateInput,
  eventCreateSchema,
} from "@server/lib/schemas/event.schema";
import { useForm } from "react-hook-form";
import createEvent from "@client/app/events/(actions)/event.actions";
import { useToast } from "@client/components/ui/use-toast";

export default function NewEventForm() {
  const { toast } = useToast();

  const form = useForm<EventCreateInput>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleSubmit(values: EventCreateInput) {
    const success = await createEvent(values);

    if (success) {
      toast({
        title: "Event creation failed.",
        description: "Please try again later.",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }

    toast({ title: "Event created successfully.", duration: 4000 });
    form.reset();
  }

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create Event
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Name of the event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Describe event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
