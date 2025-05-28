import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { KEEP_KEY } from '@/constants/decorator.constant';
import { ResOp } from '@/common/model/response.model';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const keep = this.reflector.getAllAndOverride<boolean>(KEEP_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (keep) return data;
        return ResOp.success(data, 'success');
      }),
    );
  }
}
