import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { stripe } from '../../shared/stripe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Region } from '@prisma/client';

function getCurrencyByRegion(region: Region) {
  switch (region) {
    case 'brazil':
      return 'BRL';
    case 'united_states':
      return 'USD';
    case 'europe':
      return 'EUR';
    default:
      return 'USD';
  }
}
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
      select: {
        region: true,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const retrievedPrices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      product: productId,
      currency: getCurrencyByRegion(user.region),
    });

    const normalizedPrices = retrievedPrices.data.map((price) => ({
      id: price.id,
      nickname: price.nickname,
      currency: price.currency.toUpperCase(),
      interval: price.recurring?.interval,
      amount: (price.unit_amount ?? 0) / 100,
      product: price.product['name'],
    }));

    console.log(normalizedPrices);

    return {
      data: normalizedPrices,
    };
  }
}
