-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'HIGH', 'MEDIUM');

-- CreateTable
CREATE TABLE "logModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logModel_pkey" PRIMARY KEY ("id")
);
