/*
  Warnings:

  - Made the column `name` on table `TutorProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TutorProfile" ALTER COLUMN "hourlyRate" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
