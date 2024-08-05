import { PrismaClient, walks_board } from '@prisma/client';

import { walksJoinDto } from "../dtos/walks-join";
import { walksJoinSendDto } from '../dtos/walks-join-send';

export class walksRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getWalkJoinMember(warlsBoard: walks_board, dto: walksJoinDto) {
    try {
      const boardParticipants = await this.prisma.walks_participants.findMany({
        where: {
          // walks_board_idx: warlsBoard.idx,
          walks_board_idx: 3 //부하 테스트를 위해서 임시
        },
        include: {
          user: true,
        },
      });
      const kafkaDtos: walksJoinSendDto[] = [];
  
      // 각 참여자에 대해 message 속성을 추가하고 이를 새로운 배열에 저장
      boardParticipants.forEach((item) => {
        const data: walksJoinSendDto = {
          message: `${warlsBoard.title} 산책에 ${dto.userDto.nickname} 님이 참석하였습니다.`,
          nickname: item.user.nickname,
          userIdx: item.user.idx,
          title: warlsBoard.title,
        };
        kafkaDtos.push(data);
      });
      return kafkaDtos;
    } catch (error) {
      throw new Error(
        `Failed to check user and count participants: ${error}`,
      );
    }
  }

  async canParticipate(dto: walksJoinDto, warlsBoard: walks_board) {
    try {
      // 특정 유저가 참여자 명단에 있는지 확인
      const participant = await this.prisma.walks_participants.findFirst({
        where: {
          walks_board_idx: warlsBoard.idx,
          user_idx: dto.userDto.idx,
        },
      });

      // if (participant) {
      //   throw new Error(
      //     `User ${dto.userDto.idx} is already a participant of board ${warlsBoard.idx}`,
      //   );
      // }
      // 해당 게시글의 총 참여자 수 계산
      const participantCount = await this.prisma.walks_participants.count({
        where: {
          walks_board_idx: warlsBoard.idx,
        },
      });

      // if (warlsBoard.max_participants <= participantCount) {
      //   throw new Error(
      //     `Board ${warlsBoard.idx} has reached the maximum number of participants`,
      //   );
      // }
    } catch (error) {
      console.error('Failed to check user and count participants:', error);
      throw new Error(
        `Failed to check user and count participants: ${error}`,
      );
    }
  }
  async getBoard(dto: walksJoinDto): Promise<walks_board> {
    try {
      const board = await this.prisma.walks_board.findUnique({
        where: {
          idx: dto.idx,
        },
      });

      if (!board) {
        throw new Error(`게시글을 찾을 수 없습니다: ${dto.idx}`);
      }
      return board; // 조회된 walks_board 리스트 반환
    } catch (error) {
      throw new Error(`Failed to fetch board: ${error}`);
    }
  }

  async createWalkJoin(dto: walksJoinDto) {
    try {
      // Prisma를 사용하여 walksBoard 생성 및 boardMedia 생성을 트랜잭션으로 묶음
      await this.prisma.walks_participants.create({
        data: {
          walks_board_idx: dto.idx,
          user_idx: dto.userDto.idx,
        },
      });

      return true;
    } catch (error) {
      throw new Error(`Failed to create board: ${error}`);
    }
  }

  async deleteErrorWalksBoard(dto: walksJoinDto) {
    try {
      // Prisma를 사용하여 walksBoard 생성 및 boardMedia 생성을 트랜잭션으로 묶음
      await this.prisma.walks_board.delete({
        where: {
          idx: dto.idx,
          user_idx: dto.userDto.idx,
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
      await this.prisma.walks_board.update({
        where: {
          idx: dto.idx, // 삭제할 레코드의 고유 식별자
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
