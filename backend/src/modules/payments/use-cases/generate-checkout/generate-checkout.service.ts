import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import { stripe } from '../../shared/stripe';

@Injectable()
export class GenerateCheckoutService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string, planId: string, returnBaseUrl: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    if (
      user.subscription &&
      user.subscription.status === SubscriptionStatus.ACTIVE
    ) {
      throw new BadRequestException('User already has a subscription');
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: planId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${returnBaseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnBaseUrl}/payments`,
        customer: user.stripeCustomerId || undefined,
        customer_email: user.stripeCustomerId ? undefined : user.email,
        metadata: {
          userId: user.id,
          priceId: planId,
        },
      });

      return {
        checkoutUrl: session.url,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
}
