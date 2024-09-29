import { IsNotEmpty, IsString } from 'class-validator';

export class emailsend {
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  message: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  name: string;
}
