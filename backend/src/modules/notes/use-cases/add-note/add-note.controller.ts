import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';
import { AddNoteService } from './add-note.service';
import { AddNoteDTO } from '../../dtos/add-note.dto';
import { NotesLimitGuard } from '../../infra/http/guards/notes-limit.guard';

@Controller('/notes')
export class AddNoteController {
  constructor(private addNoteService: AddNoteService) {}

  @Post()
  @Roles(Role.USER)
  @HttpCode(201)
  @UseGuards(NotesLimitGuard)
  async handle(@UserId() userId: string, @Body() body: AddNoteDTO) {
    return this.addNoteService.execute(userId, body);
  }
}
