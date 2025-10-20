import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class LoginDTO extends createZodDto(loginSchema) {}
