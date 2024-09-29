import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-loggers.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggersModule {}
