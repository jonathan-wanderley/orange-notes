import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { stripe } from '../../shared/stripe';

@Injectable()
export class GenerateBillingPortalService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string, returnUrl: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    if (!user.stripeCustomerId) {
      throw new BadRequestException('User does not have a stripe customer id');
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl,
    });

    return {
      portalUrl: stripeSession.url,
    };
  }
}
