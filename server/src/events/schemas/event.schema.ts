import { z } from 'zod';

export const eventCreateSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Event name must be at least 2 characters' })
    .max(200, { message: 'Event name must be at most 200 characters' }),
  description: z //
    .string()
    .max(1000, {
      message: "Event description can't be longer than 1000 characters",
    }),
  eventStartDate: z.coerce.date({ required_error: 'Event date is required' }),
  eventStartTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

export const eventUpdateSchema = z.object({
  eventId: z.number(),
  name: z
    .string()
    .min(2, { message: 'Event name must be at least 2 characters' })
    .max(200, { message: 'Event name must be at most 200 characters' }),
  description: z //
    .string()
    .max(1000, {
      message: "Event description can't be longer than 1000 characters",
    }),
});

export const eventDeleteSchema = z.object({
  eventId: z.number(),
});

export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
export type EventDeleteInput = z.infer<typeof eventDeleteSchema>;
