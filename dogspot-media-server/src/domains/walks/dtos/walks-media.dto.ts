import { IsNotEmpty, IsString } from 'class-validator';

export class boardMedia {
  walksBoardIdx: number;

  @IsString()
  @IsNotEmpty()
  type: string;


  thumbnail: string;

  url: string;
}
