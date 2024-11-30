import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenPayloadDto } from '../auth/dtos/token-payload.dto';
import { TokenPayloadParams } from '../auth/params/token-payload.params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQuery } from './queries/users.query';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Param() query: UsersQuery) {
    return this.usersService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParams() tokenPayload: TokenPayloadDto,
  ) {
    return this.usersService.update(tokenPayload, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('new-password/me')
  updatePassword(
    @Body() updateUserDto: UpdateUserPasswordDto,
    @TokenPayloadParams() tokenPayload: TokenPayloadDto,
  ) {
    return this.usersService.updatePassword(tokenPayload, updateUserDto);
  }
}
