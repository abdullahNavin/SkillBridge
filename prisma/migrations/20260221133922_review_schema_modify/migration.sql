/*
  Warnings:

  - Added the required column `studentName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "studentImg" TEXT,
ADD COLUMN     "studentName" TEXT NOT NULL;
