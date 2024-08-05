-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `profilePath` VARCHAR(191) NULL,
    `agreeWithMarketing` BOOLEAN NOT NULL,
    `loginMethod` VARCHAR(191) NULL,
    `refresh_token` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boardMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `walksBoardIdx` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    INDEX `boardMedia_walksBoardIdx_idx`(`walksBoardIdx`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `walksBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userIdx` INTEGER NOT NULL,
    `title` VARCHAR(1000) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `places` VARCHAR(191) NOT NULL,
    `meetingDatetime` DATETIME(3) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boardMedia` ADD CONSTRAINT `boardMedia_walksBoardIdx_fkey` FOREIGN KEY (`walksBoardIdx`) REFERENCES `walksBoard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `walksBoard` ADD CONSTRAINT `walksBoard_userIdx_fkey` FOREIGN KEY (`userIdx`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
