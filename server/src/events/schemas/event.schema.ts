import { z } from 'zod';

export type Event = {
  eventId: number;
  name: string;
  description: string | undefined;
  eventStart: Date;
  eventEnd: Date | undefined;
};

export const eventCreateSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Event name must be at least 2 characters' })
      .max(200, { message: 'Event name must be at most 200 characters' }),

    description: z //
      .string()
      .max(1000, {
        message: "Event description can't be longer than 1000 characters",
      }),

    eventStartDate: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date'
            ? 'Valid start date is required'
            : defaultError,
      }),
    }),

    eventStartTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),

    eventEndEnabled: z.coerce.boolean(),

    eventEndDate: z.coerce
      .date({
        errorMap: (issue, { defaultError }) => ({
          message:
            issue.code === 'invalid_date'
              ? 'Valid start date is required'
              : defaultError,
        }),
      })
      .optional(),

    eventEndTime: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional()
      .or(z.literal('')),
  })
  // TODO: There is a bug that this does not run before all other validations are done, but can be fixed later
  .superRefine((schema, ctx) => {
    // TODO: add validations to make sure end date is after start date and both are in future

    // If end time is enabled, end date and time must be set
    if (schema.eventEndEnabled) {
      if (!schema.eventEndDate) {
        ctx.addIssue({
          code: 'invalid_date',
          path: ['eventEndDate'],
          message: 'Valid date is required',
        });
      }

      if (!schema.eventEndTime) {
        ctx.addIssue({
          code: 'invalid_date',
          path: ['eventEndTime'],
          message: 'Valid date is required',
        });
      }
    }
    return z.NEVER;
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
