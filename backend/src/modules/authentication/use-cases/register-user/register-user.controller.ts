import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterUserService } from './register-user.service';
import { RegisterUserDTO } from '../../dtos/register-user.dto';
import { IsPublicRoute } from '@/shared/helpers/decorators/public-route.decorator';

@Controller('/auth/register')
export class RegisterUserController {
  constructor(private registerUserService: RegisterUserService) {}

  @Post()
  @IsPublicRoute()
  @HttpCode(200)
  async handle(@Body() body: RegisterUserDTO) {
    return this.registerUserService.execute(body);
  }
}
