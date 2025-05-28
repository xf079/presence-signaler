import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';

import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { CacheModule } from './cache/cache.module';

const providers = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
];

@Global()
@Module({
  imports: [
    // logging
    LoggerModule.forRoot(),
    PrismaModule,
    CacheModule,
  ],
  providers: [...providers],
  exports: [PrismaModule, CacheModule],
})
export class SharedModule {}
