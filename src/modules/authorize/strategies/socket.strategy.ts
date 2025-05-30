import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../services/token.service';

@Injectable()
export class SocketStrategy extends PassportStrategy(Strategy, 'socket-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 从WebSocket握手的query参数中提取token
        (request: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return request.handshake?.query.token as string;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_JWT_SECRET', 'secret-value'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid socket token payload');
    }
    return {
      sub: payload.sub,
      email: payload.email,
    };
  }
}
