import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
export default class CreateUserProjectDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();

  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required!' })
  user_id: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Project ID is required!' })
  project_id: string;

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
