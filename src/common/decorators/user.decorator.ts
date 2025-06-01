import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '@/modules/authorize/services/token.service';

/**
 * 当前用户装饰器
 * 用于在控制器方法中获取当前登录用户信息
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);
