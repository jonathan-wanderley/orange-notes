import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { StripeController } from './stripe/stripe.controller';

@Module({
  imports: [DatabaseModule],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [],
})
export class WebhooksModule {}
