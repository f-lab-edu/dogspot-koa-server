import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class walksJoinSendDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userIdx: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  message: string;
}
