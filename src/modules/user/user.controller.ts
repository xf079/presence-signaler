import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';

@ApiTags('用户管理')
@Controller('accounts')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
  })
  @Post('create')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.userService.create(createAccountDto);
  }

  @ApiOperation({
    summary: '获取用户详情',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
  })
  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '更新用户',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
  })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.userService.update(id, updateAccountDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
  })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
