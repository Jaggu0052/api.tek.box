import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserProfileModule } from 'src/user-profile/user-profile.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    forwardRef(() => UserProfileModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d', algorithm: 'HS256' },
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
