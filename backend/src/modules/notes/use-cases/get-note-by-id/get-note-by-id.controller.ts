import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';
import { GetNoteByIdService } from './get-note-by-id.service';

@Controller('/notes')
export class GetNoteByIdController {
  constructor(private getNoteByIdService: GetNoteByIdService) {}

  @Get(':id')
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string, @Param('id') noteId: string) {
    return this.getNoteByIdService.execute(userId, noteId);
  }
}
