import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserProfileDTO } from 'src/schema-validations/user-profile';
import { UserProfileService } from './user-profile.service';
import { emailsend } from 'src/schema-validations/email';
import * as SibApiV3Sdk from '@sendinblue/client';
import time_out from '../email-templates/time-out';
import * as moment from 'moment';
import { MyLoggerService } from 'src/my-loggers/my-loggers.service';
import { responseObj } from '../types/data.types';
import { v4 as uuidv4 } from 'uuid';
import {
  EMAIL_FAILED,
  EMAIL_SUCSSESS,
  USER_BY_ID_SUCSSESS,
  USER_NOT_FOUND,
  USER_PROFILE_DELETED,
  USER_PROFILE_SAVED,
  USER_PROFILE_UPDATED,
  USER_PROFILE_UPDATED_ERROR,
  USERS_DETAILS_FATCHED_SUCSSESS,
} from 'src/messages/messages';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { InsertUser, SelectUser } from 'src/db/schemas/user-profile';
// import { SelectUser } from 'src/db/schemas/user-profile';
@UseGuards(AuthGuard)
@Controller('user-profile')
export class UserProfileController {
  html: string;
  authService: AuthService;
  UserProfileService: UserProfileService;
  private readonly logger = new MyLoggerService(UserProfileController.name);
  constructor(
    private readonly _userProfileServiceData: UserProfileService,
    private readonly _authService: AuthService,
  ) {
    this.UserProfileService = _userProfileServiceData;
    this.authService = _authService;
  }
  @Post('save-profile')
  async saveUserProfile(
    @Body() userProfile: UserProfileDTO,
    @Res() res,
  ): Promise<InsertUser | null> {
    try {
      const hashedPassword = await this.authService.hashPassword(
        userProfile.password,
      );
      userProfile.uuid = uuidv4();
      userProfile.password = hashedPassword;
      const data = await this.UserProfileService.saveUserProfile(userProfile);
      const responseObj: responseObj = {
        success: true,
        statusCode: 201,
        message: USER_PROFILE_SAVED,
        data: data,
      };
      return res.status(201).json(responseObj);
    } catch (err) {
      console.error(err);
      throw Object.assign(
        new Error(`${EMAIL_FAILED} ${err?.response?.statusMessage}`),
        {
          statusCode: err?.response?.statusCode,
        },
      );
    }
  }

  @Get('user-details')
  async getAllUserProfileDetails(@Req() req, @Res() res) {
    try {
      const page: number = req.page;
      const limit: number = req.limit;
      const skip = (page - 1) * limit;
      const request = {
        skip: skip,
        limit: limit,
      };
      const data = await this.UserProfileService.getProfiledetails(request);

      const responseObj: responseObj = {
        success: true,
        statusCode: 200,
        message: USERS_DETAILS_FATCHED_SUCSSESS,
        data: data,
        page: page,
        limit: limit,
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      console.error(err);
    }
  }

  @Get('user-getbyid/:id')
  async getProfileById(
    @Param('id') id: string,
    @Res() res,
  ): Promise<SelectUser | null> {
    try {
      const data = await this.UserProfileService.getProfileById(id);
      const responseObj: responseObj = {
        success: true,
        statusCode: 200,
        message: data[0]?.id == null ? USER_NOT_FOUND : USER_BY_ID_SUCSSESS,
        data: data,
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      console.error(err);
      throw Object.assign(
        new Error(`${EMAIL_FAILED} ${err.response.statusMessage}`),
        {
          statusCode: err.response.statusCode,
        },
      );
    }
  }

  @Put('update-profile')
  async updateUserProfile(@Body() userProfileDTO: UserProfileDTO, @Res() res) {
    try {
      const data = await this.UserProfileService.updateUserByid(
        userProfileDTO?.id,
        userProfileDTO,
      );
      const responseObj: responseObj = {
        success: true,
        statusCode: 200,
        message:
          userProfileDTO?.deleted_at == null
            ? USER_PROFILE_UPDATED
            : USER_PROFILE_DELETED,
        data: data,
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      throw Object.assign(
        new Error(
          `${USER_PROFILE_UPDATED_ERROR} ${err.response.statusMessage}`,
        ),
        {
          statusCode: err.response.statusCode,
        },
      );
    }
  }

  @Delete('user-deletebyid/:id')
  async DeleteUserProfileById(@Param('id') id: string, @Res() res) {
    try {
      await this.UserProfileService.DeleteUserProfileById(id);
      const responseObj: responseObj = {
        success: true,
        statusCode: 200,
        message: USER_PROFILE_DELETED,
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      throw Object.assign(
        new Error(
          `${USER_PROFILE_UPDATED_ERROR} ${err.response.statusMessage}`,
        ),
        {
          statusCode: err.response.statusCode,
        },
      );
    }
  }

  @Post('send-email')
  async sendEmail(@Body() emailSend: emailsend, @Res() res) {
    try {
      const Today = new Date();
      const date = moment(Today).format('DD-MM-YYYY HH:mm:ss');
      const apiKey: string = process.env.EMAIL_API_KEY;
      this.html = time_out;
      this.html = this.html.replace('%%name%%', emailSend.name);
      this.html = this.html.replace('%%time%%', date);
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      apiInstance.setApiKey(
        SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
        apiKey,
      );
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.subject = emailSend.subject;
      sendSmtpEmail.sender = {
        email: process.env.SEND_EMAIL,
        name: emailSend.name,
      }; // Replace with actual sender details
      sendSmtpEmail.to = [{ email: emailSend.email, name: emailSend.name }]; // Replace with actual recipient details
      sendSmtpEmail.htmlContent = this.html;
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      const responseObj: responseObj = {
        success: true,
        statusCode: 200,
        message: EMAIL_SUCSSESS,
        data: response.body,
      };
      return res.status(response.response.statusCode).json(responseObj);
    } catch (err) {
      console.error(err);
      throw Object.assign(
        new Error(`${EMAIL_FAILED} ${err.response.statusMessage}`),
        {
          statusCode: err.response.statusCode,
        },
      );
    }
  }
}
