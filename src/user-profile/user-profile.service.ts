import { Injectable } from '@nestjs/common';
import { UserProfileDTO } from 'src/schema-validations/user-profile';
import db from '../db/drizzle.connection';
import userProfileSChema from 'src/db/schemas/user-profile';
import { eq } from 'drizzle-orm';
import { SelectUser } from 'src/db/schemas/user-profile';

@Injectable()
export class UserProfileService {
  db: any;
  constructor() {
    this.db = db;
  }
  async saveUserProfile(userProfile: UserProfileDTO): Promise<UserProfileDTO> {
    return await this.db
      .insert(userProfileSChema)
      .values(userProfile)
      .returning();
  }

  async getProfileById(id: string): Promise<SelectUser> {
    return await this.db
      .select({
        id: userProfileSChema.id,
        uuid: userProfileSChema.uuid,
        first_name: userProfileSChema.first_name,
        last_name: userProfileSChema.last_name,
        username: userProfileSChema.username,
        employee_id: userProfileSChema.employee_id,
        primary_email: userProfileSChema.primary_email,
        designation_id: userProfileSChema.designation_id,
        secondary_email: userProfileSChema.secondary_email,
        primary_phone_number: userProfileSChema.primary_phone_number,
        secondary_phone_number: userProfileSChema.secondary_phone_number,
        status: userProfileSChema.status,
        user_type: userProfileSChema.user_type,
        access_token: userProfileSChema.access_token,
        tokens: userProfileSChema.tokens,
        login_count: userProfileSChema.login_count,
        created_by: userProfileSChema.created_by,
        updated_by: userProfileSChema.updated_by,
        created_at: userProfileSChema.created_at,
        updated_at: userProfileSChema.updated_at,
        deleted_at: userProfileSChema.deleted_at,
        image_url: userProfileSChema.image_url,
      })
      .from(userProfileSChema)
      .where(eq(userProfileSChema.uuid, id));
  }

  async findByUserName(username: string) {
    return await this.db
      .select()
      .from(userProfileSChema)
      .where(eq(userProfileSChema.username, username));
  }

  async updateUserByid(id: number, userProfile: UserProfileDTO) {
    return await this.db
      .update(userProfileSChema)
      .set(userProfile)
      .where(eq(userProfileSChema.id, id));
  }

  async getProfiledetails(_request: any): Promise<SelectUser[]> {
    return await this.db
      .select({
        id: userProfileSChema.id,
        uuid: userProfileSChema.uuid,
        first_name: userProfileSChema.first_name,
        last_name: userProfileSChema.last_name,
        username: userProfileSChema.username,
        employee_id: userProfileSChema.employee_id,
        primary_email: userProfileSChema.primary_email,
        designation_id: userProfileSChema.designation_id,
        secondary_email: userProfileSChema.secondary_email,
        primary_phone_number: userProfileSChema.primary_phone_number,
        secondary_phone_number: userProfileSChema.secondary_phone_number,
        status: userProfileSChema.status,
        user_type: userProfileSChema.user_type,
        access_token: userProfileSChema.access_token,
        tokens: userProfileSChema.tokens,
        login_count: userProfileSChema.login_count,
        created_by: userProfileSChema.created_by,
        updated_by: userProfileSChema.updated_by,
        created_at: userProfileSChema.created_at,
        updated_at: userProfileSChema.updated_at,
        deleted_at: userProfileSChema.deleted_at,
        image_url: userProfileSChema.image_url,
      })
      .from(userProfileSChema)
      .limit(_request.limit)
      .offset(_request.skip);
  }

  async DeleteUserProfileById(id: string) {
    return await this.db
      .delete(userProfileSChema)
      .where(eq(userProfileSChema.uuid, id));
  }
}
