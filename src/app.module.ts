import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileController } from './user-profile/user-profile.controller';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { MyLoggersModule } from './my-loggers/my-loggers.module';
import { MyLoggerService } from './my-loggers/my-loggers.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from './comments/comments.module';
import { DesignationModule } from './designation/designation.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UserProjectsModule } from './user-projects/user-projects.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';

@Module({
  imports: [
    UserProfileModule,
    MyLoggersModule,
    AuthModule,
    JwtModule,
    CommentsModule,
    DesignationModule,
    ProjectsModule,
    TasksModule,
    UserProjectsModule,
    UserTasksModule,
  ],
  controllers: [AppController, UserProfileController, AuthController],
  providers: [
    AppService,
    UserProfileService,
    MyLoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AuthService,
  ],
})
export class AppModule {}
