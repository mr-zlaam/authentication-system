-- DropIndex
DROP INDEX "uid_user_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cooldownExpiry" TIMESTAMP(3),
ADD COLUMN     "lastOtpRequest" TIMESTAMP(3),
ADD COLUMN     "otpExpiry" TIMESTAMP(3),
ADD COLUMN     "otpRequestCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "otp_user_idx" ON "User"("otp");

-- CreateIndex
CREATE INDEX "createdAt_user_idx" ON "User"("createdAt");
