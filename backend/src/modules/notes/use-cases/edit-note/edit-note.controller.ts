import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';
import { EditNoteService } from './edit-note.service';
import { EditNoteDTO } from '../../dtos/edit-note.dto';

@Controller('notes')
export class EditNoteController {
  constructor(private editNoteService: EditNoteService) {}

  @Put(':id')
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(
    @UserId() userId: string,
    @Param('id') noteId: string,
    @Body() body: EditNoteDTO,
  ) {
    return this.editNoteService.execute(userId, noteId, body);
  }
}
