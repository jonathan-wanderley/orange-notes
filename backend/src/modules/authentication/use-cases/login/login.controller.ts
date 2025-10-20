import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDTO } from '../../dtos/login.dto';
import { IsPublicRoute } from 'src/shared/helpers/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @IsPublicRoute()
  @Post('/login')
  @HttpCode(200)
  async handle(@Body() { email, password }: LoginDTO) {
    return await this.loginService.execute({
      email,
      password,
    });
  }
}
