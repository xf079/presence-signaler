import { Module } from '@nestjs/common';
import { AccountsModule } from '@/modules/accounts/accounts.module';
import { AuthorizeModule } from '@/modules/authorize/authorize.module';
import { SignalerModule } from '@/modules/signaler/signaler.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [AccountsModule, AuthorizeModule, SignalerModule, RoomModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
