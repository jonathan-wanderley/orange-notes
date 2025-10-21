import { Region } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createAccountSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string(),
  region: z.nativeEnum(Region),
});

export class CreateAccountDTO extends createZodDto(createAccountSchema) {}
