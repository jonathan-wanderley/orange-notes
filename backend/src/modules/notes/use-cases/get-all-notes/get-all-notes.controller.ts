import { Controller, Get, HttpCode } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';
import { GetAllNotesService } from './get-all-notes.service';

@Controller('notes')
export class GetAllNotesController {
  constructor(private getAllNotesService: GetAllNotesService) {}

  @Get()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string) {
    return await this.getAllNotesService.execute(userId);
  }
}
