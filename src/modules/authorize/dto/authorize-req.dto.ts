import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '邮箱',
    example: 'admin@admin.com',
  })
  email: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: '邮箱',
    example: 'admin@admin.com',
  })
  email: string;

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  code: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: '确认密码',
    example: '123456',
  })
  confirmPassword: string;
}

