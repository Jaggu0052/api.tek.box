import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsDate,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
export default class CreateCommentDTO {
  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();

  @IsUUID()
  @IsNotEmpty({ message: 'Task ID is required!' })
  task_id: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Created by is required!' })
  created_by: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Updated by is required!' })
  updated_by: string;

  @IsDate()
  @IsOptional()
  updated_at?: Date = new Date();
}
