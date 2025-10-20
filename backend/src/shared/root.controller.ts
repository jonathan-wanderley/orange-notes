import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IsPublicRoute } from './helpers/decorators/public-route.decorator';
import { HealthResponse } from './types/health-response';

@IsPublicRoute()
@Controller()
export class RootController {
  constructor() {}

  @Get('/health')
  @ApiOkResponse({ type: HealthResponse })
  async health(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
