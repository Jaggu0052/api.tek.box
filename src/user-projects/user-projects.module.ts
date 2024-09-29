import { Module } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';

@Module({
  providers: [UserProjectsService],
})
export class UserProjectsModule {}
