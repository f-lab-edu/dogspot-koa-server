/*
  Warnings:

  - Added the required column `sequence` to the `boardMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `walksBoard_user_idx_fkey` ON `walksBoard`;

-- AlterTable
ALTER TABLE `boardMedia` ADD COLUMN `sequence` INTEGER NOT NULL;
