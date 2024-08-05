import { walksJoinDto } from './dtos/walks-join';
import { walksService } from './walks.service';

export class walksController {
  private readonly walksService: walksService;

  constructor() {
    this.walksService = new walksService();
  }
  async walksJoin(dto: walksJoinDto) {
    try {
      // walksJoin 로직을 여기에 추가
      await this.walksService.walksJoin(dto);

      // 필요한 비즈니스 로직을 수행합니다.
    } catch (error) {
      console.error(`Error in walksJoin: ${error}`);
      throw new Error(`Failed to process walksJoin: ${error}`);
    }
  }

  //게시글 작성 도중에 에러가 났을 때, 하드 delete 처리하는 기능입니다.
  async deleteErrorWalksBoard(dto: walksJoinDto) {
    try {
      // walksJoin 로직을 여기에 추가
      await this.walksService.deleteErrorWalksBoard(dto);

      // 필요한 비즈니스 로직을 수행합니다.
    } catch (error) {
      console.error(`Error in deleteWalksBoard: ${error}`);
      throw new Error(`Failed to process walksJoin: ${error}`);
    }
  }

  //유저가 직접 게시글 삭제 처리하는 기능입니다. 소프트 delete 처리하는 기능입니다.
  async deleteWalksBoard(dto: walksJoinDto) {
    try {
      // walksJoin 로직을 여기에 추가
      await this.walksService.deleteWalksBoard(dto);

      // 필요한 비즈니스 로직을 수행합니다.
    } catch (error) {
      console.error(`Error in deleteWalksBoard: ${error}`);
      throw new Error(`Failed to process walksJoin: ${error}`);
    }
  }
}
export const walksControllerInstance = new walksController(); // Export instance of walksController