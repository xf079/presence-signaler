import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class SocketAuthGuard
  extends AuthGuard('socket-jwt')
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();

    // 为WebSocket客户端添加request对象，以便passport可以处理
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!client.request) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      client.request = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        handshake: client.handshake,
      };
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // WebSocket连接认证失败时，断开连接
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client: WebSocket = context.switchToWs().getClient();
      // client.disconnect('Unauthorized');
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user as unknown as any;
  }
}
