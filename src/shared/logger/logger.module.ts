import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static forRoot() {
    return {
      module: LoggerModule,
      providers: [LoggerService],
      exports: [LoggerService],
    };
  }
}
