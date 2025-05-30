import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../services/token.service';

/**
 * WebSocket当前用户装饰器
 * 用于在WebSocket网关中获取当前登录用户信息
 */
export const SocketUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const client = ctx.switchToWs().getClient();
    // const user = client.handshake?.authro;
    console.log(client);

    return { sub: '1', email: '1' };

    // return data ? user?.[data] : user;
  },
);
