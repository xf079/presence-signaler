import { HttpException, HttpStatus } from '@nestjs/common';
import { RESPONSE_SUCCESS_CODE } from '@/constants/response.constant';

export default class ApiException extends HttpException {
  constructor(error: string) {
    if (!error.includes(':')) {
      super(
        HttpException.createBody({
          code: RESPONSE_SUCCESS_CODE,
          message: error,
        }),
        HttpStatus.OK,
      );
      return;
    }

    const [code, message] = error.split(':');
    super(
      HttpException.createBody({
        code: Number(code),
        message,
      }),
      HttpStatus.OK,
    );
    return;
  }
}
