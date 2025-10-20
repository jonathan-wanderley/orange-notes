import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../../repositories/notes.repository';

@Injectable()
export class GetAllNotesService {
  constructor(private notesRepository: NotesRepository) {}

  async execute(userId: string) {
    const notes = await this.notesRepository.getAllNotes(userId);

    return notes;
  }
}
