import { Topic } from "../../kafka/helpers/constants";
import { walksJoinDto } from "./dtos/walks-join";
import { walksRepository } from "./repositories/walks.repository";
import { sendMessageToTopic } from "../../kafka/producer"; // Kafka 메시지 전송 함수 import
import { walksMediaRepository } from "./repositories/walks.media.repository";
import { Message } from "./helpers/constants";

export class walksService {
  private readonly walksRepo: walksRepository;
  private readonly walksMediaRepo: walksMediaRepository;

  constructor() {
    this.walksRepo = new walksRepository();
    this.walksMediaRepo = new walksMediaRepository();
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

  async deleteErrorWalksBoard(dto: walksJoinDto) {
    try {
      await this.walksRepo.deleteErrorWalksBoard(dto); 
      await this.walksMediaRepo.deleteErrorWalksBoard(dto); 
      await sendMessageToTopic(Topic.WALKS_ERROR, Message.WALKS_ERROR);
    } catch (error) {
      throw new Error(`Failed to deleteErrorWalksBoard: ${error}`);
    }
  }

  async deleteWalksBoard(dto: walksJoinDto) {
    try {
      await this.walksRepo.deleteWalksBoard(dto); 
      await this.walksMediaRepo.deleteWalksBoard(dto); 
      await sendMessageToTopic(Topic.WALKS_DELETE, Message.WALKS_DELETE);
    } catch (error) {
      throw new Error(`Failed to deleteWalksBoard: ${error}`);
    }
  }
}
