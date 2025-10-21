import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticationRepository } from '../../repositories/authentication.repository';
import { LoginDTO } from '../../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { Region } from '@prisma/client';

interface TokenUserPayload {
  id: string;
  email: string;
  name: string;
  region: Region;
  roles: string[];
}

@Injectable()
export class LoginService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: LoginDTO) {
    const user = await this.authenticationRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new BadRequestException('Incorrect Credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      throw new BadRequestException('Credentials incorrect');

    const token = await this.login({
      id: user.id,
      name: user.name,
      email: user.email,
      region: user.region,
      roles: user.roles.map((role) => role.role.name),
    });

    return {
      data: {
        status: 'LOGGED_IN',
        token,
      },
    };
  }

  private async login(payload: TokenUserPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
