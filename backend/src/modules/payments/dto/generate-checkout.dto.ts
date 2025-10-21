import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const generateCheckoutSchema = z.object({
  planId: z.string(),
  returnBaseUrl: z.string(),
});

export class GenerateCheckoutDTO extends createZodDto(generateCheckoutSchema) {}
