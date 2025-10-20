import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const addNoteSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export class AddNoteDTO extends createZodDto(addNoteSchema) {}
