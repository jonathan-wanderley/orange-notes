import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(body: Buffer, signature: string) {
    const secret = process.env.STRIPE_SECRET_KEY as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (!secret || !signature || !webhookSecret) {
      throw new Error('Missing secret or signature');
    }

    const stripe = new Stripe(secret);

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        if (event.data.object.payment_status === 'paid') {
          const userId = event.data.object.metadata?.userId;
          const user = await this.prismaService.user.findUnique({
            where: {
              id: userId,
              email: event.data.object.customer_details?.email as string,
            },
          });

          const retrievedSubscription = await stripe.subscriptions.retrieve(
            event.data.object.subscription as string,
          );

          const [currentSubscription] = retrievedSubscription.items.data;

          await this.prismaService.$transaction(async (tx) => {
            await tx.user.update({
              where: { id: userId },
              data: {
                stripeCustomerId: event.data.object.customer as string,
              },
            });

            await tx.subscription.upsert({
              where: { userId: user!.id },
              update: {
                status: SubscriptionStatus.ACTIVE,
                currentPeriodEnd: new Date(
                  currentSubscription.current_period_end,
                ),
                stripeSubscriptionId: event.data.object.subscription as string,
              },
              create: {
                userId: user!.id,
                status: SubscriptionStatus.ACTIVE,
                currentPeriodEnd: new Date(
                  currentSubscription.current_period_end,
                ),
                stripeSubscriptionId: event.data.object.subscription as string,
              },
            });
          });
        }
        break;

      case 'invoice.payment_failed':
        // pagamento da fatura falhou
        // TODO:payment correction logic
        // send mail to user?
        await this.prismaService.subscription.update({
          where: { userId: event.data.object.metadata?.userId },
          data: {
            status: SubscriptionStatus.INACTIVE,
          },
        });
        break;

      case 'invoice.paid':
        const user = await this.prismaService.user.findUnique({
          where: {
            id: event.data.object.metadata?.userId,
          },
          include: {
            subscription: true,
          },
        });

        if (!user) throw new Error('User not found');

        const retrievedSubscription = await stripe.subscriptions.retrieve(
          user.subscription!.stripeSubscriptionId,
        );

        const [currentSubscription] = retrievedSubscription.items.data;

        await this.prismaService.subscription.update({
          where: { userId: event.data.object.metadata?.userId },
          data: {
            status: SubscriptionStatus.ACTIVE,
            currentPeriodEnd: new Date(currentSubscription.current_period_end),
          },
        });
        break;

      case 'customer.subscription.deleted':
        await this.prismaService.subscription.update({
          where: { stripeSubscriptionId: event.data.object.id },
          data: {
            status: SubscriptionStatus.CANCELLED,
          },
        });
        break;
    }
  }
}
