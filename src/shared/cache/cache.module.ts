import { Global, Module } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvSqlite from '@keyv/sqlite';
import { Cacheable } from 'cacheable';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@/shared/cache/cache.service';

@Global()
@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      inject: [ConfigService],
      useFactory: () => {
        const keyv = new Keyv({
          store: new KeyvSqlite('sqlite://data/cache.db'),
          namespace: 'presence-signaler-app',
        });
        return new Cacheable({ primary: keyv, ttl: '24h' });
      },
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE', CacheService],
})
export class CacheModule {}
