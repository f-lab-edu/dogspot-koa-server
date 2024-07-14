/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `boardMedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `boardMedia` table. All the data in the column will be lost.
  - The primary key for the `walksBoard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `walksBoard` table. All the data in the column will be lost.
  - Added the required column `idx` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idx` to the `boardMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idx` to the `walksBoard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `boardMedia` DROP FOREIGN KEY `boardMedia_walksBoardIdx_fkey`;

-- DropForeignKey
ALTER TABLE `walksBoard` DROP FOREIGN KEY `walksBoard_userIdx_fkey`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idx` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idx`);

-- AlterTable
ALTER TABLE `boardMedia` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idx` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idx`);

-- AlterTable
ALTER TABLE `walksBoard` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idx` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idx`);

-- AddForeignKey
ALTER TABLE `boardMedia` ADD CONSTRAINT `boardMedia_walksBoardIdx_fkey` FOREIGN KEY (`walksBoardIdx`) REFERENCES `walksBoard`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `walksBoard` ADD CONSTRAINT `walksBoard_userIdx_fkey` FOREIGN KEY (`userIdx`) REFERENCES `User`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;
