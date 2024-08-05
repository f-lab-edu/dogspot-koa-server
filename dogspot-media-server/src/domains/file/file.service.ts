import { board_media } from "@prisma/client";
import * as path from 'path';

import { FilePath, Type } from "./helpers/constants";
import { FileConvertService } from "./file.convert.service";

export class FileService {
    private readonly fileConvertService: FileConvertService;

    constructor() {
        this.fileConvertService = new FileConvertService();
    }
    async walksBoardMediaConvert(walksMediaInfos: board_media): 
      Promise<{ outputPath: string, coverPhotoPath: string } | undefined> {
        const fileNameWithExt = path.basename(walksMediaInfos.original_file_url);
        const baseFileName = fileNameWithExt.replace(/\.[^/.]+$/, ""); // 확장자를 제거합니다.

        try {
          if (walksMediaInfos.type === Type.VIDEO) {
            const result = await this.fileConvertService.videoConvert(
              walksMediaInfos.original_file_url,
              baseFileName,
              FilePath.WALKS_BOARD_PATH
            );
            if (!result) {
              throw new Error(`Failed to walksJoin:`);
            }
            return result;
          }
    
          if (walksMediaInfos.type === Type.IMAGE) {
            const result = await this.fileConvertService.imageConvert(
                walksMediaInfos.original_file_url,
                baseFileName,
                FilePath.WALKS_BOARD_PATH
              );
            if (!result) {
              throw new Error(`Failed to walksJoin:`);
            }
            return result;
          }
        } catch (error) {
          throw new Error(`Failed to walksJoin: ${error}`);
        }
      }
}