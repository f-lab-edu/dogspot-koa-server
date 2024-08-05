import { PrismaClient } from "@prisma/client";
import { walksJoinDto } from "../dtos/walks-join";

export class walksMediaRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  
  async deleteErrorWalksBoard(dto: walksJoinDto) {
    try {
      await this.prisma.board_media.deleteMany({
        where: {
          walks_board_idx: dto.idx,
        },
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete walksBoard: ${error}`);
    }
  }

  async deleteWalksBoard(dto: walksJoinDto){
    try {
      // Prisma를 사용하여 walks_board에서 소프트 삭제 수행
      await this.prisma.board_media.updateMany({
        where: {
          walks_board_idx: dto.idx, // 삭제할 레코드의 고유 식별자
        },
        data: {
          updated_at: new Date(),
          deleted_at: new Date(), // deleted_at 필드를 현재 날짜와 시간으로 설정하여 소프트 삭제 처리
        },
      });

      return true;
    } catch (error) {
      throw new Error(`Failed to delete deleteWalksBoard: ${error}`);
    }
  }
}