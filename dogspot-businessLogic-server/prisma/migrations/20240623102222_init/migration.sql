/*
  Warnings:

  - You are about to drop the `boardMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `walksBoard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `boardMedia`;

-- DropTable
DROP TABLE `walksBoard`;

-- CreateTable
CREATE TABLE `board_media` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `walks_board_idx` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `sequence` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `board_media_walks_board_idx_idx`(`walks_board_idx`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `walks_board` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `user_idx` INTEGER NOT NULL,
    `title` VARCHAR(1000) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `places` VARCHAR(191) NOT NULL,
    `meetingDatetime` DATETIME(3) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
