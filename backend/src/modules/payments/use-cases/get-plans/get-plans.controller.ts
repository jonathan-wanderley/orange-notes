import { Controller, Get, HttpCode } from '@nestjs/common';
import { GetStripePricesService } from './get-plans.service';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';

@Controller('/payments/plans')
export class GetStripePricesController {
  constructor(private getStripePricesService: GetStripePricesService) {}

  @Get()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string) {
    return this.getStripePricesService.execute(userId);
  }
}
