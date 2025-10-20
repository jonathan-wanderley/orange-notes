import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtStrategy } from './providers/local/jwt.strategy';
import { LoginService } from './use-cases/login/login.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './providers/local/local.guard';
import { LoginController } from './use-cases/login/login.controller';
import { RegisterUserService } from './use-cases/register-user/register-user.service';
import { RegisterUserController } from './use-cases/register-user/register-user.controller';
import { ValidateUserService } from './services/validate-user.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '6h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    LoginService,
    RegisterUserService,
    ValidateUserService,
  ],
  controllers: [LoginController, RegisterUserController],
})
export class AuthenticationModule {}
