import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentRequiredException extends HttpException {
  constructor(
    response: string | Record<string, any> = 'Payment Required',
    status: number = HttpStatus.PAYMENT_REQUIRED,
  ) {
    super(response, status);
  }
}
