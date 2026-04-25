/*
  Warnings:

  - Added the required column `progress` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "progress" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
