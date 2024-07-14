import { PrismaClient, board_media } from '@prisma/client';


export class walksRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getBoardMedia(warlsBoard: number): Promise<board_media[]> {
    try {
      const result = await this.prisma.board_media.findMany({
        where: {
          walks_board_idx: warlsBoard,
        },
      });

      if (result.length === 0) {
        throw new Error('Board media not found');
      }
      return result;
    } catch (error) {
      throw new Error(
        `Failed at walksRepository -> getBoardMedia: ${error}`,
      );
    }
  }

  async updateBoardMedia( idx: number, outputPath: string, coverPhotoPath: string ) {
    return this.prisma.board_media.update({
        where: { idx },
        data: {
          url: outputPath,
          thumbnail_url: coverPhotoPath
      }
    });
  }
}
