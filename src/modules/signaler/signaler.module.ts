import { Module } from '@nestjs/common';
import { SignalerService } from './signaler.service';
import { SignalerGateway } from './signaler.gateway';

@Module({
  providers: [SignalerGateway, SignalerService],
})
export class SignalerModule {}
