import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizeReqDto } from './dto/authorize-req.dto';
import { UpdateAuthorizeDto } from './dto/update-authorize.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtPayload, TokenService } from './services/token.service';

@Injectable()
export class AuthorizeService {
  constructor(private readonly tokenService: TokenService) {}

  /**
   * 用户登录
   */
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // 这里应该验证用户凭据，例如从数据库查询用户信息
    // 为了演示，这里使用硬编码的用户信息
    const { username, password } = loginDto;
    
    // 模拟用户验证逻辑
    if (username === 'admin' && password === 'password') {
      const payload: JwtPayload = {
        sub: 1,
        username: 'admin',
        email: 'admin@example.com',
      };
      
      const tokenResponse = this.tokenService.generateAccessToken(payload);
      
      return {
        ...tokenResponse,
        user: {
          id: payload.sub,
          username: payload.username,
          email: payload.email,
        },
      };
    }
    
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * 为已验证的用户生成token
   */
  async generateTokenForUser(user: any): Promise<LoginResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    
    const tokenResponse = this.tokenService.generateAccessToken(payload);
    
    return {
      ...tokenResponse,
      user: {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
      },
    };
  }

  create(createAuthorizeDto: AuthorizeReqDto) {
    return 'This action adds a new authorize';
  }

  findAll(user?: JwtPayload) {
    return `This action returns all authorize for user: ${user?.username || 'anonymous'}`;
  }

  findOne(id: number, user?: JwtPayload) {
    return `This action returns a #${id} authorize for user: ${user?.username || 'anonymous'}`;
  }

  update(id: number, updateAuthorizeDto: UpdateAuthorizeDto, user?: JwtPayload) {
    return `This action updates a #${id} authorize by user: ${user?.username || 'anonymous'}`;
  }

  remove(id: number, user?: JwtPayload) {
    return `This action removes a #${id} authorize by user: ${user?.username || 'anonymous'}`;
  }
}
