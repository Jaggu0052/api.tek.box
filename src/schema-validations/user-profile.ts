import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TEAMLEAD = 'TEAMLEAD',
  EMPLOYEE = 'EMPLOYEE',
}

export class UserProfileDTO {
  id?: number;

  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();
  @IsNumber()
  login_count?: number;
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  image_url?: string;

  @IsString()
  tokens?: string;

  @IsString()
  access_token?: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  employee_id?: string;

  @IsEmail()
  @IsOptional()
  primary_email?: string;

  @IsUUID()
  @IsOptional()
  designation_id?: string;

  @IsEmail()
  @IsOptional()
  secondary_email?: string;

  @IsString()
  @IsNotEmpty()
  primary_phone_number: string;

  @IsString()
  @IsOptional()
  secondary_phone_number?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(UserType)
  @IsNotEmpty()
  user_type: UserType;

  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;

  @IsDate()
  @IsOptional()
  updated_at?: Date = new Date();
  created_at?: Date = new Date();
  deleted_at?: Date;
}
