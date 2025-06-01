import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeService } from '@/modules/authorize/authorize.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { Public } from '@/common/decorators/public.decorator';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  CreateSmsCodeDto,
} from './dto/authorize-req.dto';
import { CodeService } from './services/code.service';
import { JwtPayload, TokenService } from './services/token.service';
import { User } from '@/common/decorators/user.decorator';

@ApiTags('Authorize - 授权认证')
@Controller('authorize')
export class AuthorizeController {
  constructor(
    private readonly codeService: CodeService,
    private readonly authorizeService: AuthorizeService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({ summary: '发送注册验证码' })
  @ApiResult({
    model: Boolean,
  })
  @Public()
  @Post('sign/sms')
  getSmsCode(@Body() data: CreateSmsCodeDto) {
    return this.codeService.send(data);
  }

  @ApiOperation({ summary: '注册' })
  @ApiResult({
    model: Boolean,
  })
  @Public()
  @Post('sign/register')
  register(@Body() data: RegisterDto) {
    return this.authorizeService.register(data);
  }

  @ApiOperation({ summary: 'JWT登录' })
  @ApiResult({
    model: Object,
  })
  @Public()
  @Post('sign/login')
  login(@Body() data: LoginDto) {
    return this.authorizeService.login(data);
  }

  @ApiOperation({ summary: '刷新令牌' })
  @ApiResult({
    model: Object,
  })
  @Post('refresh')
  refreshToken(@Body() refreshData: RefreshTokenDto) {
    return this.authorizeService.refreshToken(refreshData);
  }

  @ApiOperation({ summary: '登出' })
  @ApiResult({
    model: Boolean,
  })
  @Post('logout')
  logout(@User() user: JwtPayload) {
    return this.authorizeService.logout(user);
  }
}
