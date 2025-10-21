import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { CreateAccountDTO } from '../../dtos/create-account.dto';
import { AuthenticationRepository } from '../../repositories/authentication.repository';

@Injectable()
export class PrismaAuthenticationRepository
  implements AuthenticationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findUserWithSameEmail(email: string, userId: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
    });
  }

  async createAccount({ email, name, password, region }: CreateAccountDTO) {
    return await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          password,
          region,
        },
      });

      const roles = await tx.role.findMany({
        where: {
          name: {
            in: ['USER'],
          },
        },
      });

      await tx.userRole.createMany({
        data: roles.map((role) => ({
          roleId: role.id,
          userId: user.id,
        })),
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        region: user.region,
      };
    });
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return user;
  }
}
