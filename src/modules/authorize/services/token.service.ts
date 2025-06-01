import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@/shared/cache/cache.service';
import ApiException from '@/common/exceptions/api.exception';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cache: CacheService,
  ) {}

  /**
   * 生成JWT令牌
   * @param userId 用户ID
   * @param email 用户邮箱
   * @returns 令牌信息
   */
  async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };
    const appJwtExpire = this.configService.get<number>('JWT_EXPIRE');
    const appJwtRefresh = this.configService.get<number>('JWT_REFRESH_EXPIRE');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: appJwtExpire,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: appJwtRefresh,
      },
    );

    // 将刷新令牌存储在缓存中，用于验证
    await this.cache.set(`access_token_${userId}`, accessToken, appJwtExpire);

    await this.cache.set(
      `refresh_token_${userId}`,
      refreshToken,
      appJwtRefresh,
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: Number(appJwtExpire),
    };
  }

  /**
   * 刷新令牌
   * @param refreshToken 刷新令牌
   * @returns 新的令牌信息
   */
  async refreshToken(refreshToken: string) {
    try {
      // 验证刷新令牌
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      // 检查缓存中是否存在该刷新令牌
      const cachedToken = await this.cache.get<string>(
        `refresh_token_${payload.sub}`,
      );
      if (!cachedToken || cachedToken !== refreshToken) {
        new ApiException('无效的刷新令牌');
      }

      // 生成新的令牌
      return this.generateTokens(payload.sub, payload.email);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('无效的刷新令牌');
    }
  }

  /**
   * 验证令牌
   * @param token 令牌
   * @returns 令牌负载
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('无效的令牌');
    }
  }

  /**
   * 撤销令牌
   * @param userId 用户ID
   */
  async revokeTokens(userId: string): Promise<void> {
    await this.cache.delete(`access_token_${userId}`);
    await this.cache.delete(`refresh_token_${userId}`);
  }
}
