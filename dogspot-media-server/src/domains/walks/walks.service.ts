import logger from "../../core/config/logger.config";
import { FileService } from "../file/file.service";
import { walksRepository } from "./repositories/walks.repository";


export class walksService {
  private readonly walksRepo: walksRepository;
  private readonly fileService: FileService;

  constructor() {
    this.walksRepo = new walksRepository();
    this.fileService = new FileService();
  }
  async convertMedia(walksBoardIdx: number): Promise<boolean> {
    try {
      const walksMediaInfos = await this.walksRepo.getBoardMedia(walksBoardIdx); 
      for (let i = 0; i < walksMediaInfos.length; i++) {
        const mediaInfo = walksMediaInfos[i];
        try {
          const result = await this.fileService.walksBoardMediaConvert(mediaInfo);
          if (!result) {
            throw new Error(`Failed to convert media with idx: ${mediaInfo.idx}`);
          }
          await this.walksRepo.updateBoardMedia(mediaInfo.idx, result.dbVideoPath, result.dbImgPath);
        } catch (error) {
          logger.error(`Error converting at walksBoard media idx ${mediaInfo.idx}:`, error);
          throw error;
        }
      }
      return true;
    } catch (error) {
      throw new Error(`Failed at walksService -> walksBoard ${error}`);
    }
  }
}
