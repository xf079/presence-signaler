import { PartialType } from '@nestjs/mapped-types';
import { CreateSignalerDto } from './create-signaler.dto';

export class UpdateSignalerDto extends PartialType(CreateSignalerDto) {
  id: number;
}
