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
}
export const walksControllerInstance = new walksController(); // Export instance of walksController