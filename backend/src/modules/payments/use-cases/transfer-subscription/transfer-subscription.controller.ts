import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TransferSubscriptionService } from './transfer-subscription.service';
import { TransferSubscriptionDTO } from '../../dto/transfer-subscription.dto';
import { Roles } from '@/modules/authorization/infra/http/decorators/roles.decorator';
import { Role } from '@/modules/authorization/core/roles.enum';

@Controller('/payments')
export class TransferSubscriptionController {
  constructor(
    private transferSubscriptionService: TransferSubscriptionService,
  ) {}

  @Post('/transfer-subscription')
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async handle(@Body() transferData: TransferSubscriptionDTO) {
    return this.transferSubscriptionService.execute(transferData);
  }
}
