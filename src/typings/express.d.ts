import type { JwtPayload } from '@/modules/authorize/services/token.service';

export {};

declare global {
  namespace Express {
    interface User extends JwtPayload {}
    interface Request {
      user: User;
    }
  }
}
