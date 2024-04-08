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
});

export type EventCreateInput = z.infer<typeof eventCreateSchema>;
