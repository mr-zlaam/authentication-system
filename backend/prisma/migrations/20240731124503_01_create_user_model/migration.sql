-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "otp" TEXT,
    "isVerfied" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_otp_key" ON "User"("otp");

-- CreateIndex
CREATE INDEX "uid_user_idx" ON "User"("uid");

-- CreateIndex
CREATE INDEX "email_user_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "name_user_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "role_user_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "role_name_user_idx" ON "User"("role", "name");

-- CreateIndex
CREATE INDEX "role_createdAt_user_idx" ON "User"("role", "createdAt");
