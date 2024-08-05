import { PrismaClient } from '@prisma/client';

export class UserRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserByIdx(userIdx: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          idx: userIdx,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error in UserRepository findUserByIdx: ${error}`);
    }
  }
}