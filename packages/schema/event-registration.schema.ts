import { z } from "zod";

export enum EventRegistrationType {
  Attend = 1,
  Rejected = 99,
}

export interface EventRegistration {
  eventRegistrationId: number;
  registrationType: EventRegistrationType;
  name: string | undefined;
  email: string | undefined;
  createdAt: Date;
}

export const eventRegistrationAddSchema = z.object({
  encryptedId: z.string(),
  salt: z.string(),
  registrationType: z.nativeEnum(EventRegistrationType),
  name: z.string().min(2).max(200).optional(),
  email: z.string().email().optional(),
});

export type EventRegistrationAddInput = z.infer<
  typeof eventRegistrationAddSchema
>;
