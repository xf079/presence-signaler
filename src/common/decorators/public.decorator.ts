import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '@/constants/decorator.constant';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
