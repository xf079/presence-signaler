import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordUtil } from '@/common/utils/password.util';
import ApiException from '@/common/exceptions/api.exception';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CacheService } from '@/shared/cache/cache.service';
import { UserService } from '@/modules/user/user.service';
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from './dto/authorize-req.dto';
import { JwtPayload, TokenService } from './services/token.service';
import { CodeService } from './services/code.service';

@Injectable()
export class AuthorizeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly codeService: CodeService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  /**
   * 注册用户
   * @param token 邮箱校验token
   * @param password 密码
   * @param confirmPassword 确认密码
   */
  async register(data: RegisterDto) {
    if (data.password !== data.confirmPassword) {
      throw new ApiException(`500:两次密码不一致`);
    }
    console.log(data);
    const exitsCode = await this.codeService.validateCode(
      'signup',
      data.email,
      data.code,
    );
    if (!exitsCode) {
      throw new ApiException(`500:验证码错误`);
    }

    await this.userService.create({
      avatar: '',
      bio: '',
      name: data.email,
      email: data.email,
      password: data.password,
    });
  }

  /**
   * JWT登录
   * @param email 邮箱
   * @param password 密码
   * @returns JWT令牌
   */
  async login(data: LoginDto) {
    console.log(data);
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const isPasswordValid = await PasswordUtil.compareWithSalt(
      data.password,
      user.password,
      user.salt,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    return this.tokenService.generateTokens(String(user.id), user.email);
  }

  /**
   * 刷新令牌
   * @param refreshToken 刷新令牌
   * @returns 新的令牌
   */
  async refreshToken(refresh: RefreshTokenDto) {
    return this.tokenService.refreshToken(refresh.refreshToken);
  }

  /**
   * 登出
   * @param userId 用户ID
   */
  async logout(user: JwtPayload) {
    await this.tokenService.revokeTokens(user.sub);
  }
}
