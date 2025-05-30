import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import { AuthorizeReqDto } from './dto/authorize-req.dto';
import { UpdateAuthorizeDto } from './dto/update-authorize.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { JwtPayload } from './services/token.service';

@Controller('authorize')
@UseGuards(JwtAuthGuard)
export class AuthorizeController {
  constructor(private readonly authorizeService: AuthorizeService) {}

  @Post('login')
  @Public() // 登录接口公开，不需要JWT验证
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authorizeService.login(loginDto);
  }

  @Post('login/local')
  @UseGuards(LocalAuthGuard)
  @Public() // 使用本地策略登录，不需要JWT验证
  async loginWithLocal(@CurrentUser() user: any): Promise<LoginResponseDto> {
    // 用户已通过LocalStrategy验证，直接生成token
    return this.authorizeService.generateTokenForUser(user);
  }

  @Post()
  @Public() // 示例：创建操作设为公开，不需要JWT验证
  create(@Body() createAuthorizeDto: AuthorizeReqDto) {
    return this.authorizeService.create(createAuthorizeDto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.authorizeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.authorizeService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorizeDto: UpdateAuthorizeDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.authorizeService.update(+id, updateAuthorizeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.authorizeService.remove(+id, user);
  }
}
