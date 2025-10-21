-- CreateEnum
CREATE TYPE "Region" AS ENUM ('brazil', 'united_states', 'europe', 'other');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "region" "Region" NOT NULL DEFAULT 'united_states';
