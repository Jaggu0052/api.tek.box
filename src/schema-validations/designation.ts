import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export default class CreateDesignationDTO {
  @IsUUID()
  @IsNotEmpty()
  uuid?: string = uuidv4();

  @IsNotEmpty({ message: 'Designation is required!' })
  @IsString()
  designation: string;

  @IsDate()
  @IsOptional()
  updated_at?: Date = new Date();
}
