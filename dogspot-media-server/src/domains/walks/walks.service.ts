import { FileService } from "../file/file.service";
import { walksRepository } from "./repositories/walks.repository";


export class walksService {
  private readonly walksRepo: walksRepository;
  private readonly fileService: FileService;

  constructor() {
    this.walksRepo = new walksRepository();
    this.fileService = new FileService();
  }
  async walksBoard(walksBoardIdx: number): Promise<boolean> {
    try {
      const walksMediaInfos = await this.walksRepo.getBoardMedia(walksBoardIdx); 
      
      for(let i = 0; i < walksMediaInfos.length; i++){
        const result = await this.fileService.walksBoardfile(walksMediaInfos[i]); 
        if(!result){
          throw new Error(`Failed at walksService -> walksBoard`);
        }
        await this.walksRepo.updateBoardMedia(
          walksMediaInfos[i].idx, 
          result.outputPath, 
          result.coverPhotoPath
        );
      }
      return true;
      // await sendMessageToTopic(Topic.WALKS_PUSH, message);
    } catch (error) {
      throw new Error(`Failed at walksService -> walksBoard ${error}`);
    }
  }
}
