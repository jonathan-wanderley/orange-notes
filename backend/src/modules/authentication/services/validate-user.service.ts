import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from '../repositories/authentication.repository';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}
  async execute(email: string) {
    const user = await this.authenticationRepository.findByEmail(email);

    return user ?? null;
  }
}
