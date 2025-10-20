import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { GenerateCheckoutService } from './use-cases/generate-checkout/generate-checkout.service';
import { GenerateCheckoutController } from './use-cases/generate-checkout/generate-checkout.controller';
import { GenerateBillingPortalService } from './use-cases/generate-billing-portal/generate-billing-portal.service';
import { GenerateBillingPortalController } from './use-cases/generate-billing-portal/generate-billing-portal.controller';
import { GetStripePricesService } from './use-cases/get-plans/get-plans.service';
import { GetStripePricesController } from './use-cases/get-plans/get-plans.controller';
import { GetSubscriptionStatusService } from './use-cases/get-subscription-status/get-subscription-status.service';
import { GetSubscriptionStatusController } from './use-cases/get-subscription-status/get-subscription-status.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    GenerateCheckoutService,
    GenerateBillingPortalService,
    GetStripePricesService,
    GetSubscriptionStatusService,
  ],
  controllers: [
    GenerateCheckoutController,
    GenerateBillingPortalController,
    GetStripePricesController,
    GetSubscriptionStatusController,
  ],
  exports: [],
})
export class PaymentsModule {}
