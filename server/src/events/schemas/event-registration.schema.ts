import { EventRegistrationType } from '@server/database/tables/event-registration';
import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export interface EventRegistration {
  eventRegistrationId: number;
  registrationType: EventRegistrationType;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  createdAt: Date;
}

export const eventRegistrationAddSchema = z.object({
  encryptedId: z.string(),
  salt: z.string(),
  registrationType: z.nativeEnum(EventRegistrationType),
  firstName: z.string().min(2).max(200).optional(),
  lastName: z.string().max(200).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).regex(phoneRegex).optional(),
});

export type EventRegistrationAddInput = z.infer<
  typeof eventRegistrationAddSchema
>;
