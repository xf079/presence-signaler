import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CacheService } from '@/shared/cache/cache.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';
import ApiException from '@/common/exceptions/api.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * 创建用户
   * @param createAccountDto
   */
  async create(createAccountDto: CreateAccountDto) {
    await this.prisma.user.create({
      data: {
        ...createAccountDto,
      },
    });
  }

  /**
   * 查询所有用户
   */
  findAll() {
    return this.prisma.user.findMany({
      where: {
        deleted: false,
      },
    });
  }

  /**
   * 查询单个用户
   * @param id
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        AND: [
          {
            deleted: false,
          },
        ],
      },
    });
    if (!user) {
      throw new ApiException('用户不存在');
    }
    return user;
  }

  /**
   * 更新用户
   * @param id
   * @param updateAccountDto
   */
  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prisma.user.update({
      where: {
        id,
        AND: [
          {
            deleted: false,
          },
        ],
      },
      data: {
        ...updateAccountDto,
      },
    });
  }

  /**
   * 删除用户
   * @param id
   */
  remove(id: number) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
