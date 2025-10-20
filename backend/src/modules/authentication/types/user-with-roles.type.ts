import { Role, User, UserRole } from '@prisma/client';

export interface UserWithRoles extends User {
  roles: (UserRole & {
    role: Role;
  })[];
}
