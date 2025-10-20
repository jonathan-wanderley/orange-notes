import { Role } from '@prisma/client';

export abstract class AuthorizationRepository {
  abstract findRoleByName(name: string): Promise<Role | undefined | null>;
  abstract findRolesByNames(names: string[]): Promise<Role[]>;
}
