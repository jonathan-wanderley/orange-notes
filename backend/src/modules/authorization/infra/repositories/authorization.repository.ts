import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthorizationRepository } from '../../repositories/authorization.repository';
import { Role } from '@prisma/client';

@Injectable()
export class PrismaAuthorizationRepository implements AuthorizationRepository {
  constructor(private prismaService: PrismaService) {}

  async findRoleByName(name: string) {
    return this.prismaService.role.findFirst({
      where: {
        name,
      },
    });
  }

  async findRolesByNames(names: string[]): Promise<Role[]> {
    return this.prismaService.role.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }
}
