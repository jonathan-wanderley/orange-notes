import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const editNoteSchema = z.object({
  title: z.string().optional(),
  text: z.string().optional(),
});

export class EditNoteDTO extends createZodDto(editNoteSchema) {}
