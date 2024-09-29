import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileService } from 'src/user-profile/user-profile.service';

@Injectable()
export class AuthService {
  UserProfileService: UserProfileService;
  constructor(private readonly _userProfileServiceData: UserProfileService) {
    this.UserProfileService = _userProfileServiceData;
  }
  async login(username: string) {
    return await this.UserProfileService.findByUserName(username);
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  }
}
