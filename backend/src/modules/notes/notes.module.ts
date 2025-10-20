import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { AddNoteService } from './use-cases/add-note/add-note.service';
import { AddNoteController } from './use-cases/add-note/add-note.controller';
import { EditNoteService } from './use-cases/edit-note/edit-note.service';
import { GetNoteByIdService } from './use-cases/get-note-by-id/get-note-by-id.service';
import { GetAllNotesService } from './use-cases/get-all-notes/get-all-notes.service';
import { DeleteNoteService } from './use-cases/delete-note/delete-note.service';
import { PrismaNotesRepository } from './infra/repositories/prisma-notes.repository';
import { GetAllNotesController } from './use-cases/get-all-notes/get-all-notes.controller';
import { GetNoteByIdController } from './use-cases/get-note-by-id/get-note-by-id.controller';
import { DeleteNoteController } from './use-cases/delete-note/delete-note.controller';
import { EditNoteController } from './use-cases/edit-note/edit-note.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddNoteService,
    GetAllNotesService,
    GetNoteByIdService,
    DeleteNoteService,
    EditNoteService,
    PrismaNotesRepository,
  ],
  controllers: [
    AddNoteController,
    GetAllNotesController,
    GetNoteByIdController,
    DeleteNoteController,
    EditNoteController,
  ],
  exports: [],
})
export class NotesModule {}
