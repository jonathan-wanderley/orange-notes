import { Region } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const registerUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string(),
  region: z.nativeEnum(Region),
});

export class RegisterUserDTO extends createZodDto(registerUserSchema) {}
