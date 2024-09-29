import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
enum Priority {
  Low = '1',
  Medium = '2',
  High = '3',
  Critical = '4',
}

enum Status {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'IN-PROGRESS' = 'IN-PROGRESS',
  'COMPLETED' = 'COMPLETED',
}

export default class CreateTaskDTO {
  @IsNumber()
  id?: number;
  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();

  @IsNotEmpty({ message: 'Heading is required!' })
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsEnum(Priority, { message: 'Priority must be one of 1, 2, 3, or 4' })
  @IsNotEmpty({ message: 'Priority is required!' })
  priority: Priority;

  @IsEnum(Status, {
    message:
      'Status must be one of ACTIVE, INACTIVE, IN-PROGRESS, or COMPLETED',
  })
  @IsNotEmpty({ message: 'Status is required!' })
  status: Status;

  @IsOptional()
  @IsUUID()
  project_id?: string;

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
