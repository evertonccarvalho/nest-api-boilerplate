import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { TokenPayloadDto } from '../auth/dtos/token-payload.dto';
import { TokenPayloadParams } from '../auth/params/token-payload.params';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
import { MessagesQuery } from './queries/messages.query';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @TokenPayloadParams() tokenPayload: TokenPayloadDto,
  ) {
    return this.messagesService.create(createMessageDto, tokenPayload);
  }

  @Get()
  async findAll(@Query() query: MessagesQuery) {
    return await this.messagesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.messagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @TokenPayloadParams() tokenPayload: TokenPayloadDto,
  ) {
    return this.messagesService.update(id, updateMessageDto, tokenPayload);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParams()
    tokenPayload: TokenPayloadDto,
  ) {
    console.log(tokenPayload);
    return this.messagesService.remove(id, tokenPayload);
  }
}
