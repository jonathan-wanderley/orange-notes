import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { NotesRepository } from '../../repositories/notes.repository';
import { Note, Subscription, SubscriptionStatus } from '@prisma/client';
import { EditNoteDTO } from '../../dtos/edit-note.dto';
import { AddNoteDTO } from '../../dtos/add-note.dto';

@Injectable()
export class PrismaNotesRepository implements NotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findSubscriptionByUserId(userId: string): Promise<Subscription | null> {
    return await this.prismaService.subscription.findUnique({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
        currentPeriodEnd: { gt: new Date() },
      },
    });
  }

  async createNote(userId: string, body: AddNoteDTO): Promise<Note | null> {
    return await this.prismaService.note.create({
      data: { userId, text: body.text, title: body.title },
    });
  }
  async updateNote(
    userId: string,
    noteId: string,
    body: EditNoteDTO,
  ): Promise<Note | null> {
    return this.prismaService.note.update({
      where: { id: noteId, userId },
      data: { text: body.text, title: body.title },
    });
  }
  async deleteNote(userId: string, noteId: string): Promise<void> {
    await this.prismaService.note.delete({
      where: { id: noteId, userId },
    });
  }
  async getNoteById(userId: string, noteId: string): Promise<Note | null> {
    return this.prismaService.note.findUnique({
      where: { id: noteId, userId },
    });
  }
  async getAllNotes(userId: string): Promise<Note[]> {
    return await this.prismaService.note.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
