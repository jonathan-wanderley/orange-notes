import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../../repositories/notes.repository';

@Injectable()
export class DeleteNoteService {
  constructor(private notesRepository: NotesRepository) {}

  async execute(userId: string, noteId: string) {
    await this.notesRepository.deleteNote(userId, noteId);
  }
}
