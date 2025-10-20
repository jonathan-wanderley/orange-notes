import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotesRepository } from '../../repositories/notes.repository';
import { EditNoteDTO } from '../../dtos/edit-note.dto';

@Injectable()
export class EditNoteService {
  constructor(private notesRepository: NotesRepository) {}

  async execute(userId: string, noteId: string, body: EditNoteDTO) {
    const note = await this.notesRepository.updateNote(userId, noteId, body);

    if (!note) {
      throw new InternalServerErrorException('Failed to update note');
    }

    return note;
  }
}
