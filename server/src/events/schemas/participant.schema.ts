import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export interface Participant {
  participant_id: number;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  created_at: Date;
}

export const participantAddSchema = z.object({
  encryptedId: z.string(),
  salt: z.string(),
  first_name: z.string().min(2).max(200),
  last_name: z.string().max(200).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).regex(phoneRegex).optional(),
});

export type ParticipantAddInput = z.infer<typeof participantAddSchema>;
