import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class GetSubscriptionStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user!.subscription) {
      return {
        isActive: false,
      };
    }

    const subscription = user!.subscription;

    return {
      isActive: subscription.status === SubscriptionStatus.ACTIVE,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
    };
  }
}
