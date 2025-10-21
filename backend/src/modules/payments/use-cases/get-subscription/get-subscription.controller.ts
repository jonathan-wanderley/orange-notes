import { Controller, Get, HttpCode } from '@nestjs/common';
import { GetSubscriptionService } from './get-subscription.service';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';

@Controller('/payments/subscription')
export class GetSubscriptionController {
  constructor(private getSubscriptionService: GetSubscriptionService) {}

  @Get()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@UserId() userId: string) {
    return this.getSubscriptionService.execute(userId);
  }
}
