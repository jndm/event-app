"use client";

import { Button } from "@client/components/ui/button";
import {
  Form,
  FormControl,
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
} from "@server/events/schemas/event.schema";
import { useForm } from "react-hook-form";
import { useToast } from "@client/components/ui/use-toast";
import { createEvent } from "../(actions)/event.actions";
import { DatePicker } from "@client/components/ui/datepicker";
import { TimeInput } from "@client/components/ui/time-input";
import { Switch } from "@client/components/ui/switch";

export default function NewEventForm() {
  const { toast } = useToast();

  const form = useForm<EventCreateInput>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      eventStartTime: "12:00",
      eventEndTime: "",
      eventEndEnabled: false,
    },
  });

  async function handleSubmit(values: EventCreateInput) {
    // Do not send set end time if not toggled on
    if (!values.eventEndEnabled) {
      delete values.eventEndDate;
      delete values.eventEndTime;
    }

    // TODO: Should trigger overlay loader until redirected

    const error = await createEvent(values);

    if (error) {
      toast({
        title: error,
        description: "Please try again later.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    toast({ title: "Event created successfully.", duration: 4000 });
    form.reset();
  }

  const handleInvalid = () => {
    console.log(form.formState.errors);
  };

  return (
    <>
      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">
        Create Event
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-8">
            <FormField
              control={form.control}
              name="eventStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventStartTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event time</FormLabel>
                  <FormControl>
                    <TimeInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="eventEndEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    Add end time
                  </Switch>
                </FormControl>
                <FormLabel>Add end time</FormLabel>
              </FormItem>
            )}
          />

          {form.getValues().eventEndEnabled && (
            <div className="flex flex-wrap gap-8">
              <FormField
                control={form.control}
                name="eventEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventEndTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <TimeInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
