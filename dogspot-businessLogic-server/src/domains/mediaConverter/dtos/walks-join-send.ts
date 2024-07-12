import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class videoConvertDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userIdx: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  nickname: string;

}
