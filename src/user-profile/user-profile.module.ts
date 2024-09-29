import { forwardRef, Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserProfileController],
  exports: [UserProfileService],
  providers: [UserProfileService],
})
export class UserProfileModule {}
