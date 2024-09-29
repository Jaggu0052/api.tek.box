import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';

@Module({
  providers: [UserTasksService],
})
export class UserTasksModule {}
