import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';
import { GenerateCheckoutService } from './generate-checkout.service';
import { GenerateCheckoutDTO } from '../../dto/generate-checkout.dto';
import { UserId } from '@/modules/authentication/infra/http/decorators/get-user-id.decorator';

@Controller('/payments/checkout')
export class GenerateCheckoutController {
  constructor(private generateCheckoutService: GenerateCheckoutService) {}

  @Post()
  @Roles(Role.USER)
  @HttpCode(200)
  async handle(@Body() body: GenerateCheckoutDTO, @UserId() userId: string) {
    return this.generateCheckoutService.execute(
      userId,
      body.planId,
      body.returnBaseUrl,
    );
  }
}
