import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString } from 'class-validator';

/**
 * 登录
 */
export class LoginDto {
  @ApiProperty({
    description: '邮箱',
    example: 'admin@admin.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsString()
  password: string;
}

/**
 * 创建验证码
 */
export class CreateSmsCodeDto {
  @ApiProperty({
    description: '邮箱',
    example: 'admin@admin.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '类型',
    enum: ['signup', 'login'],
    example: 'signup',
  })
  @IsString()
  @IsIn(['signup', 'login'], {
    message: '参数异常',
  })
  type: string;
}

/**
 * 注册
 */
export class RegisterDto {
  @ApiProperty({
    description: '邮箱',
    example: 'admin@admin.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '确认密码',
    example: '123456',
  })
  @IsString()
  confirmPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: '刷新令牌',
  })
  @IsString()
  refreshToken: string;
}
