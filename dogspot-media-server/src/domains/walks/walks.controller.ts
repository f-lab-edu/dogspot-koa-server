import { walksService } from './walks.service';

export class walksController {
  private readonly walksService: walksService;

  constructor() {
    this.walksService = new walksService();
  }
  async walksBoardConvert(walksBoardIdx: number): Promise<boolean> {
    try {
      const result = await this.walksService.convertMedia(walksBoardIdx);
      return result;
    } catch (error) {
      
      console.error(`Error in walksJoin: ${error}`);
      throw new Error(`Failed to process walksJoin: ${error}`);
    }
  }
}
export const walksControllerInstance = new walksController(); // Export instance of walksController