import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import loginDTO from 'src/schema-validations/login';
import {
  INVALID_PASSWORD,
  INVALID_USERNAME,
  USER_LOGIN_SUCSSESS,
} from 'src/messages/messages';
import { JwtService } from '@nestjs/jwt';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { UserProfileDTO } from 'src/schema-validations/user-profile';
import { errorResponseObj, responseObj } from '../types/data.types';

@Controller('auth')
export class AuthController {
  authService: AuthService;
  UserProfileService: UserProfileService;
  constructor(
    private readonly _authService: AuthService,
    private readonly _userProfileServiceData: UserProfileService,
    private jwtService: JwtService,
  ) {
    this.authService = _authService;
    this.UserProfileService = _userProfileServiceData;
  }

  @Post('login')
  async loginUser(@Body() loginDto: loginDTO, @Res() res) {
    try {
      const user = await this.authService.login(loginDto.username);
      if (user?.length == 0) {
        const responseObj: errorResponseObj = {
          statusCode: 404,
          error: 'Not Found',
          message: INVALID_USERNAME,
        };
        throw res.status(401).json(responseObj);
      }
      const isPasswordValid = await this.authService.comparePasswords(
        loginDto.password,
        user[0].password,
      );
      if (!isPasswordValid) {
        const responseObj: errorResponseObj = {
          statusCode: 401,
          error: 'Unauthorized',
          message: INVALID_PASSWORD,
        };
        throw res.status(401).json(responseObj);
      }
      const payload = { sub: user[0].id, username: user[0].username };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        algorithm: 'HS256',
      });
      const decode = this.jwtService.decode(token);
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
        algorithms: ['HS256'],
      });
      if (user[0]?.login_count < 5) {
        const userProfile: UserProfileDTO = {
          access_token: token,
          tokens:
            user[0]?.tokens != '' && user[0]?.tokens != null
              ? `${user[0]?.tokens},${token}`
              : `${token}`,
          id: user[0]?.id,
          first_name: user[0]?.first_name,
          username: user[0]?.username,
          password: user[0]?.password,
          primary_phone_number: user[0]?.primary_phone_number,
          status: user[0]?.status,
          user_type: user[0]?.user_type,
          created_by: user[0]?.created_by,
          updated_by: user[0]?.updated_by,
          created_at: user[0]?.created_at,
          updated_at: new Date(),
          login_count: user[0]?.login_count + 1,
        };
        await this.UserProfileService.updateUserByid(user[0]?.id, userProfile);
      } else {
        const userProfile: UserProfileDTO = {
          access_token: token,
          tokens: `${token}`,
          id: user[0]?.id,
          first_name: user[0]?.first_name,
          username: user[0]?.username,
          password: user[0]?.password,
          primary_phone_number: user[0]?.primary_phone_number,
          status: user[0]?.status,
          user_type: user[0]?.user_type,
          created_by: user[0]?.created_by,
          updated_by: user[0]?.updated_by,
          created_at: user[0]?.created_at,
          updated_at: new Date(),
          login_count: 1,
        };
        await this.UserProfileService.updateUserByid(user[0]?.id, userProfile);
      }
      const { password, ...userWithoutPassword } = user[0];
      console.log(password);
      console.log(decoded, decode);
      const responseObj: responseObj = {
        statusCode: 200,
        success: true,
        message: USER_LOGIN_SUCSSESS,
        data: {
          access_token: token,
          user: userWithoutPassword,
        },
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      console.error(err);
    }
  }
}
