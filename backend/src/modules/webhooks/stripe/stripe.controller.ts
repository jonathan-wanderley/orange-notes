import {
  Controller,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { IsPublicRoute } from '@/shared/helpers/decorators/public-route.decorator';
import { FastifyRequest } from 'fastify';

@Controller('/webhooks/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  @IsPublicRoute()
  @HttpCode(200)
  async handle(
    @Req() req: RawBodyRequest<FastifyRequest>,
    @Headers('stripe-signature') signature: string,
  ) {
    const bodyBuffer = req.rawBody;

    if (!bodyBuffer) {
      throw new InternalServerErrorException('Missing body');
    }

    return this.stripeService.execute(bodyBuffer, signature);
  }
}
