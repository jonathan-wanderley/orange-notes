import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateAccountDTO extends createZodDto(createAccountSchema) {}
