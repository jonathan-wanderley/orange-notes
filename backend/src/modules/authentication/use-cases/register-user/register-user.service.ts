import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Region, User } from '@prisma/client';
import { RegisterUserDTO } from '../../dtos/register-user.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationRepository } from '../../repositories/authentication.repository';

interface TokenUserPayload {
  id: string;
  email: string;
  name: string;
  region: Region;
  roles: string[];
}

@Injectable()
export class RegisterUserService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<any | User> {
    const { password, email, name, region } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await this.authenticationRepository.createAccount({
      email,
      name,
      password: hashedPassword,
      region,
    });

    if (!registeredUser) {
      throw new InternalServerErrorException('Algo saiu errado');
    }

    // const userRoles = registeredUser.roles.map((role) => role.role.name);

    const token = await this.register({
      id: registeredUser.id as string,
      email: registeredUser.email,
      name: registeredUser.name,
      region: registeredUser.region,
      roles: ['USER'],
    });

    return {
      data: {
        user: {
          id: registeredUser.id,
          name: registeredUser.name,
          email: registeredUser.email,
        },
        token,
      },
    };
  }

  private async register(payload: TokenUserPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
