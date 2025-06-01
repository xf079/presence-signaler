import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CacheService } from '@/shared/cache/cache.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';
import ApiException from '@/common/exceptions/api.exception';
import { PasswordUtil } from '@/common/utils/password.util';

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
    const { hash, salt } = await PasswordUtil.hashWithSaltResult(
      createAccountDto.password,
    );
    await this.prisma.user.create({
      data: {
        ...createAccountDto,
        password: hash,
        salt,
      },
      omit: {
        password: true,
        salt: true,
        deleted: true,
        deletedAt: true,
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
      omit: {
        password: true,
        salt: true,
        deleted: true,
        deletedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        AND: [
          {
            deleted: false,
          },
        ],
      },
      omit: {
        deleted: true,
        deletedAt: true,
      },
    });
    if (!user) {
      throw new ApiException('用户不存在');
    }
    return user;
  }

  /**
   * 查询单个用户
   * @param id
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        AND: [
          {
            deleted: false,
          },
        ],
      },
      omit: {
        password: true,
        salt: true,
        deleted: true,
        deletedAt: true,
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
  async update(id: string, updateAccountDto: UpdateAccountDto) {
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
      omit: {
        password: true,
        salt: true,
        deleted: true,
        deletedAt: true,
      },
    });
  }

  /**
   * 删除用户
   * @param id
   */
  remove(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
      omit: {
        password: true,
        salt: true,
        deleted: true,
        deletedAt: true,
      },
    });
  }
}
