import { Note, Subscription } from '@prisma/client';
import { EditNoteDTO } from '../dtos/edit-note.dto';
import { AddNoteDTO } from '../dtos/add-note.dto';

export abstract class NotesRepository {
  abstract createNote(userId: string, body: AddNoteDTO): Promise<Note | null>;
  abstract updateNote(
    userId: string,
    noteId: string,
    body: EditNoteDTO,
  ): Promise<Note | null>;
  abstract deleteNote(userId: string, noteId: string): Promise<void>;
  abstract getNoteById(userId: string, noteId: string): Promise<Note | null>;
  abstract getAllNotes(userId: string): Promise<Note[]>;
  abstract findSubscriptionByUserId(
    userId: string,
  ): Promise<Subscription | null>;
}
