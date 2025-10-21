import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GenerateCheckoutService } from './use-cases/generate-checkout/generate-checkout.service';
import { GenerateCheckoutController } from './use-cases/generate-checkout/generate-checkout.controller';
import { GenerateBillingPortalService } from './use-cases/generate-billing-portal/generate-billing-portal.service';
import { GenerateBillingPortalController } from './use-cases/generate-billing-portal/generate-billing-portal.controller';
import { GetStripePricesService } from './use-cases/get-plans/get-plans.service';
import { GetStripePricesController } from './use-cases/get-plans/get-plans.controller';
import { GetSubscriptionService } from './use-cases/get-subscription/get-subscription.service';
import { GetSubscriptionController } from './use-cases/get-subscription/get-subscription.controller';
import { TransferSubscriptionService } from './use-cases/transfer-subscription/transfer-subscription.service';
import { TransferSubscriptionController } from './use-cases/transfer-subscription/transfer-subscription.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    GenerateCheckoutService,
    GenerateBillingPortalService,
    GetStripePricesService,
    GetSubscriptionService,
    TransferSubscriptionService,
  ],
  controllers: [
    GenerateCheckoutController,
    GenerateBillingPortalController,
    GetStripePricesController,
    GetSubscriptionController,
    TransferSubscriptionController,
  ],
  exports: [],
})
export class PaymentsModule {}
