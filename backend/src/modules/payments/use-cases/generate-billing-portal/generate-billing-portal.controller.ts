import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { GenerateBillingPortalService } from './generate-billing-portal.service';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';

@Controller('/payments/billing-portal')
export class GenerateBillingPortalController {
  constructor(
    private generateBillingPortalService: GenerateBillingPortalService,
  ) {}

  @Get()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(
    @UserId() userId: string,
    @Query('returnUrl') returnUrl: string,
  ) {
    return this.generateBillingPortalService.execute(userId, returnUrl);
  }
}
