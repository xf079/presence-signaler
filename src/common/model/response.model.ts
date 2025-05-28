import { ApiProperty } from '@nestjs/swagger';
import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from '@/constants/response.constant';

export class ResOp<T = any> {
  @ApiProperty({ type: Object })
  data?: T;

  @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'boolean', default: true })
  success: boolean;

  @ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MSG })
  message: string;

  constructor(code: number, data: T, message = RESPONSE_SUCCESS_MSG) {
    this.code = code;
    this.data = data;
    this.success = code === RESPONSE_SUCCESS_CODE;
    this.message = message;
  }

  static success<T>(data?: T, message?: string) {
    return new ResOp(RESPONSE_SUCCESS_CODE, data, message);
  }

  static error(code: number, message: string) {
    return new ResOp(code, message, '请求失败');
  }
}

export class TreeResult<T> {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: Number,
  })
  parentId: number;

  @ApiProperty()
  children?: TreeResult<T>[];
}
