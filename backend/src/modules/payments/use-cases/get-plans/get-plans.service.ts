import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import { stripe } from '../../shared/stripe';

@Injectable()
export class GetStripePricesService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string) {
    const productId = process.env.STRIPE_PRODUCT_ID;

    if (!productId) throw new InternalServerErrorException();

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    const prices = await stripe.prices.list({
      active: true,
      product: productId,
    });

    if (
      !user!.subscription ||
      user!.subscription.status === SubscriptionStatus.CANCELLED ||
      user!.subscription.status === SubscriptionStatus.INACTIVE
    ) {
      const plans = prices.data.map((price) => {
        return {
          id: price.id,
          period: price.recurring?.interval,
          totalInCents: price.unit_amount,
          isActive: false,
        };
      });

      return {
        hasSubscription: false,
        plans,
      };
    }

    const subscription = await stripe.subscriptions.retrieve(
      user!.subscription!.stripeSubscriptionId,
    );

    const plans = prices.data.map((price) => {
      return {
        id: price.id,
        period: price.recurring?.interval,
        totalInCents: price.unit_amount,
        isActive: subscription.items.data.some((p) => p.price.id === price.id),
      };
    });

    return {
      hasSubscription: !!user!.subscription,
      plans,
    };
  }
}
