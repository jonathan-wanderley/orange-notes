import { Prisma, Region, User } from '@prisma/client';
import { CreateAccountDTO } from '../dtos/create-account.dto';

export abstract class AuthenticationRepository {
  abstract findById(userId: string): Promise<User | null>;
  abstract createAccount(
    data: CreateAccountDTO,
  ): Promise<{ id: string; name: string; email: string; region: Region }>;
  abstract findByEmail(email: string): Promise<Prisma.UserGetPayload<{
    include: { roles: { include: { role: true } } };
  }> | null>;
  abstract findUserWithSameEmail(
    email: string,
    userId: string,
  ): Promise<User | undefined | null>;
}
