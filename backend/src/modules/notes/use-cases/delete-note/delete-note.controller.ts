import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';
import { DeleteNoteService } from './delete-note.service';

@Controller('/notes')
export class DeleteNoteController {
  constructor(private deleteNoteService: DeleteNoteService) {}

  @Delete(':id')
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string, @Param('id') noteId: string) {
    return this.deleteNoteService.execute(userId, noteId);
  }
}
