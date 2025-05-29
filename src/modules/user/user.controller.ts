import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account-req.dto';

@ApiTags('用户管理')
@Controller('accounts')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty({
    description: '创建用户',
    type: CreateAccountDto,
  })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.userService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.userService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
