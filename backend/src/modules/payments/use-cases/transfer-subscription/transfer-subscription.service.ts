import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { TransferSubscriptionDTO } from '../../dto/transfer-subscription.dto';
import { SubscriptionStatus, TransferSubscriptionStatus } from '@prisma/client';
import { stripe } from '../../shared/stripe';

@Injectable()
export class TransferSubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(transferData: TransferSubscriptionDTO) {
    const { fromUserEmail, toUserEmail } = transferData;

    const fromUser = await this.prismaService.user.findUnique({
      where: { email: fromUserEmail },
      include: { subscription: true },
    });

    if (!fromUser) {
      throw new BadRequestException('Source user not found');
    }

    if (
      !fromUser.subscription ||
      fromUser.subscription.status !== SubscriptionStatus.ACTIVE
    ) {
      throw new BadRequestException(
        'Source user has no active subscription to transfer',
      );
    }

    const toUser = await this.prismaService.user.findUnique({
      where: { email: toUserEmail },
      include: { subscription: true },
    });

    if (!toUser) {
      throw new BadRequestException('Destination user not found');
    }

    if (
      toUser.subscription &&
      toUser.subscription.status === SubscriptionStatus.ACTIVE
    ) {
      throw new BadRequestException(
        'Destination user already has a active subscription',
      );
    }

    const customerId = fromUser.stripeCustomerId;

    if (!customerId) {
      throw new BadRequestException(
        'Source user does not have a stripe customer id',
      );
    }

    const originalStripeEmail = fromUser.email;

    try {
      await stripe.customers.update(customerId, {
        email: toUser.email,
      });

      await this.prismaService.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: fromUser.id },
          data: { stripeCustomerId: null },
        });

        await tx.user.update({
          where: { id: toUser.id },
          data: { stripeCustomerId: customerId, region: fromUser.region },
        });

        await tx.subscription.update({
          where: { userId: fromUser.id },
          data: { userId: toUser.id },
        });

        await this.prismaService.transferSubscriptionLog.create({
          data: {
            fromUserEmail: originalStripeEmail,
            toUserEmail: toUser.email,
            status: TransferSubscriptionStatus.SUCCESS,
            message: 'Subscription transferred successfully',
          },
        });
      });
    } catch (error) {
      await stripe.customers.update(customerId, {
        email: originalStripeEmail,
      });

      await this.prismaService.transferSubscriptionLog.create({
        data: {
          fromUserEmail: originalStripeEmail,
          toUserEmail: toUser.email,
          status: TransferSubscriptionStatus.FAILED,
          message: error.message,
        },
      });

      throw new InternalServerErrorException('Failed to transfer subscription');
    }

    return {
      message: 'Subscription transferred successfully',
    };
  }
}
