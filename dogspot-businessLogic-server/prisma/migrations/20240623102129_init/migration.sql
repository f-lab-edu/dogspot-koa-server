-- CreateTable
CREATE TABLE `ref_token` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `user_idx` INTEGER NOT NULL,
    `platform` VARCHAR(100) NULL,
    `ref_token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
