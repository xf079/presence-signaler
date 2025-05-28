import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from '@/constants/decorator.constant';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
