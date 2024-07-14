import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { SocialMethodType } from '../helpers/constants';

export class User {
  @IsNotEmpty()
  @IsNumber()
  idx: number;

  @IsNotEmpty()
  @IsNumber()
  userIdx: number;

  @MaxLength(64)
  email: string;

  @MaxLength(32)
  nickname: string;

  @IsString()
  profilePath: string;

  loginMethod: SocialMethodType;
}
