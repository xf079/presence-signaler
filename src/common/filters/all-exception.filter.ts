import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from '@nestjs/common';
import { ResOp } from '@/common/model/response.model';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = !(exception instanceof HttpException)
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : exception.getStatus();

    const message = exception.message;

    const errorResponse = ResOp.error(status, message);

    this.logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'ExceptionFilter',
    );

    response.status(500).json(errorResponse);
  }
}
