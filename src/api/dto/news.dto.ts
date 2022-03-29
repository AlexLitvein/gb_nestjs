import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsDateString,
} from 'class-validator';
import { Comment } from './comment.dto';

export class News {
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt!: Date;

  updatedAt!: Date;

  @ValidateIf((o) => o.description)
  @IsString()
  description!: string;

  text!: string;

  comments!: Comment[];
}
