import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetSubscriptionService {
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
        data: null,
      };
    }

    const { id, status, currentPeriodEnd, stripeSubscriptionPriceId } =
      user!.subscription;

    console.log({ id, status, currentPeriodEnd, stripeSubscriptionPriceId });

    return {
      data: {
        id,
        status,
        currentPeriodEnd,
        stripeSubscriptionPriceId,
      },
    };
  }
}
