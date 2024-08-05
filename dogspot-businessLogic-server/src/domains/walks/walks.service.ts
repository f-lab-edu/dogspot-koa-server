import { Topic } from "../../kafka/helpers/constants";
import { walksJoinDto } from "./dtos/walks-join";
import { walksRepository } from "./repositories/walks.repository";
import { sendMessageToTopic } from "../../kafka/producer"; // Kafka 메시지 전송 함수 import

export class walksService {
  private readonly walksRepo: walksRepository;

  constructor() {
    this.walksRepo = new walksRepository();
  }

  async walksJoin(dto: walksJoinDto) {
    try {
      const walks = await this.walksRepo.getBoard(dto); 
      await this.walksRepo.canParticipate(dto, walks);
      await this.walksRepo.createWalkJoin(dto);
      const message = await this.walksRepo.getWalkJoinMember(walks, dto);
      
      await sendMessageToTopic(Topic.WALKS_PUSH, message);
    } catch (error) {
      throw new Error(`Failed to walksJoin: ${error}`);
    }
  }
}
