import { PrismaClient } from '@prisma/client';

export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient;
};

export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
