/*
  Warnings:

  - You are about to drop the column `walksBoardIdx` on the `boardMedia` table. All the data in the column will be lost.
  - You are about to drop the column `userIdx` on the `walksBoard` table. All the data in the column will be lost.
  - Added the required column `walks_board_idx` to the `boardMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_idx` to the `walksBoard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `boardMedia` DROP FOREIGN KEY `boardMedia_walksBoardIdx_fkey`;

-- DropForeignKey
ALTER TABLE `walksBoard` DROP FOREIGN KEY `walksBoard_userIdx_fkey`;

-- AlterTable
ALTER TABLE `boardMedia` DROP COLUMN `walksBoardIdx`,
    ADD COLUMN `walks_board_idx` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `walksBoard` DROP COLUMN `userIdx`,
    ADD COLUMN `user_idx` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `boardMedia_walks_board_idx_idx` ON `boardMedia`(`walks_board_idx`);

-- AddForeignKey
ALTER TABLE `boardMedia` ADD CONSTRAINT `boardMedia_walks_board_idx_fkey` FOREIGN KEY (`walks_board_idx`) REFERENCES `walksBoard`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `walksBoard` ADD CONSTRAINT `walksBoard_user_idx_fkey` FOREIGN KEY (`user_idx`) REFERENCES `User`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;
