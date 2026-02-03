-- AlterTable
ALTER TABLE "TutorProfile" ALTER COLUMN "yearsOfExperience" DROP NOT NULL,
ALTER COLUMN "isAvailable" DROP NOT NULL;

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";
