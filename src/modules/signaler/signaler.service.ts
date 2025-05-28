import { Injectable } from '@nestjs/common';
import { CreateSignalerDto } from './dto/create-signaler.dto';
import { UpdateSignalerDto } from './dto/update-signaler.dto';

@Injectable()
export class SignalerService {
  create(createSignalerDto: CreateSignalerDto) {
    return 'This action adds a new signaler';
  }

  findAll() {
    return `This action returns all signaler`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signaler`;
  }

  update(id: number, updateSignalerDto: UpdateSignalerDto) {
    return `This action updates a #${id} signaler`;
  }

  remove(id: number) {
    return `This action removes a #${id} signaler`;
  }
}
