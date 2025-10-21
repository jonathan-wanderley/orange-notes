import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();

  console.log('Seeding roles...');

  await prisma.role.deleteMany();
  await prisma.role.createMany({
    data: [
      { name: 'ADMIN', description: 'Administrator role' },
      { name: 'USER', description: 'Regular user role' },
    ],
  });

  console.log('Roles seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
