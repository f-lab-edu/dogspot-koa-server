import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '../../user/dtos/user.dto';

export class walksJoinDto {
  @IsNotEmpty()
  @IsNumber()
  idx: number;

  @IsNotEmpty()
  userDto: User;
}
