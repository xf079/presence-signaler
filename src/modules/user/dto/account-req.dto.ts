import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: '邮箱',
    example: '123456@qq.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    description: '头像',
    example: 'https://www.baidu.com/img/bd_logo1.png',
  })
  avatar?: string;

  @ApiProperty({
    description: '简介',
    example: '我是一个程序员',
  })
  bio: string;
}

export class UpdateAccountDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;
}
