import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from '../../repositories/notes.repository';

@Injectable()
export class GetNoteByIdService {
  constructor(private notesRepository: NotesRepository) {}

  async execute(userId: string, noteId: string) {
    const note = await this.notesRepository.getNoteById(userId, noteId);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }
}
