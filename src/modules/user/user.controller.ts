import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';

@ApiTags('用户管理')
@Controller('accounts')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
  })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.userService.create(createAccountDto);
  }

  @ApiOperation({
    summary: '获取用户详情',
  })
  @Get('profile')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: '更新用户',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.userService.update(+id, updateAccountDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
