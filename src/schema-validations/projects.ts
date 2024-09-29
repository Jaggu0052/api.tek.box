import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsDate,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export default class CreateProjectDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();

  @IsNotEmpty({ message: 'Project name is required!' })
  @IsString()
  project_name: string;

  @IsOptional()
  @IsString()
  primary_key?: string;

  @IsOptional()
  @IsString()
  notes?: string;

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
