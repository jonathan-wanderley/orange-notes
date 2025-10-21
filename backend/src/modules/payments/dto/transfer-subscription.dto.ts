import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const transferSubscriptionSchema = z.object({
  fromUserEmail: z.string().email(),
  toUserEmail: z.string().email(),
});

export class TransferSubscriptionDTO extends createZodDto(
  transferSubscriptionSchema,
) {}
