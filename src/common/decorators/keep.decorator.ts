import { SetMetadata } from '@nestjs/common';
import { KEEP_KEY } from '@/constants/decorator.constant';

export const Keep = () => SetMetadata(KEEP_KEY, true);
