import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AuthorizeModule } from '@/modules/authorize/authorize.module';
// import { SignalerModule } from '@/modules/signaler/signaler.module';
// import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, AuthorizeModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
