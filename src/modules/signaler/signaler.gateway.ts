import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SignalerService } from './signaler.service';
import { CreateSignalerDto } from './dto/create-signaler.dto';
import { UpdateSignalerDto } from './dto/update-signaler.dto';
import { Socket } from 'node:dgram';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class SignalerGateway {
  constructor(private readonly signalerService: SignalerService) {}

  @SubscribeMessage('createSignaler')
  create(
    @MessageBody() createSignalerDto: CreateSignalerDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('createSignaler', {
      message: 'test',
    });
    console.log(createSignalerDto);
    return this.signalerService.create(createSignalerDto);
  }

  @SubscribeMessage('findAllSignaler')
  findAll() {
    return this.signalerService.findAll();
  }

  @SubscribeMessage('findOneSignaler')
  findOne(@MessageBody() id: number) {
    return this.signalerService.findOne(id);
  }

  @SubscribeMessage('updateSignaler')
  update(@MessageBody() updateSignalerDto: UpdateSignalerDto) {
    return this.signalerService.update(updateSignalerDto.id, updateSignalerDto);
  }

  @SubscribeMessage('removeSignaler')
  remove(@MessageBody() id: number) {
    return this.signalerService.remove(id);
  }
}
