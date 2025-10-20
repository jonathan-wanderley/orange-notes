import { Controller, Get, HttpCode } from '@nestjs/common';
import { GetSubscriptionStatusService } from './get-subscription-status.service';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';

@Controller('/payments/subscription-status')
export class GetSubscriptionStatusController {
  constructor(
    private getSubscriptionStatusService: GetSubscriptionStatusService,
  ) {}

  @Get()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string) {
    return this.getSubscriptionStatusService.execute(userId);
  }
}
