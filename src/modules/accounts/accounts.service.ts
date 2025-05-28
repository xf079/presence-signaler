import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CacheService } from '@/shared/cache/cache.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    await this.prisma.user.create({
      data: {
        ...createAccountDto,
      },
    });
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
