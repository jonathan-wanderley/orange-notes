import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotesRepository } from '../../repositories/notes.repository';
import { AddNoteDTO } from '../../dtos/add-note.dto';

@Injectable()
export class AddNoteService {
  constructor(private notesRepository: NotesRepository) {}

  async execute(userId: string, body: AddNoteDTO) {
    const note = await this.notesRepository.createNote(userId, body);

    if (!note) {
      throw new InternalServerErrorException('Failed to create note');
    }

    return note;
  }
}
