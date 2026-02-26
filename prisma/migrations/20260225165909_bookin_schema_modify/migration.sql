/*
  Warnings:

  - Added the required column `tutorImg` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorQualification` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tutorImg" TEXT NOT NULL,
ADD COLUMN     "tutorName" TEXT NOT NULL,
ADD COLUMN     "tutorQualification" TEXT NOT NULL;
