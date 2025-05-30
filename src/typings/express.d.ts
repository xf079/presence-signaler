import type { JwtPayload } from '@/modules/authorize/services/token.service';

export {};

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      handshake: JwtPayload;
    }
  }
}
