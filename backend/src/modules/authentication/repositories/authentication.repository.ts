import { User } from '@prisma/client';
import { CreateAccountDTO } from '../dtos/create-account.dto';

export abstract class AuthenticationRepository {
  abstract findById(userId: string): Promise<User | null>;
  abstract createAccount(
    data: CreateAccountDTO,
  ): Promise<{ id: string; name: string; email: string }>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findUserWithSameEmail(
    email: string,
    userId: string,
  ): Promise<User | undefined | null>;
}
