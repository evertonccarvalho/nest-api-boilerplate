import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { MessagePresenter } from './presenters/message.presenter';
import { MessagesQuery } from './queries/messages.query';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessagePresenter> {
    const from = await this.usersService.findOne(createMessageDto.fromId);
    const to = await this.usersService.findOne(createMessageDto.toId);
    const newMessage = {
      text: createMessageDto.text,
      from: from.id,
      to: to.id,
      read: false,
      createdAt: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    return new MessagePresenter(await this.messageRepository.save(message));
  }
  async findAll(
    query: MessagesQuery,
  ): Promise<{ messages: MessagePresenter[]; count: number }> {
    const limit = query.limit ?? 10; // Valor padrão de 10
    const offset = query.offset ?? 0; // Começa no primeiro registro
    const sort = query.sort ?? 'DESC'; // Padrão: ordem decrescente

    const [messages, count] = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.from', 'from')
      .leftJoinAndSelect('message.to', 'to')
      .select(['message', 'from.id', 'from.name', 'to.id', 'to.name'])
      .take(limit)
      .skip(offset)
      .orderBy('message.createdAt', sort)
      .getManyAndCount();

    return {
      count,
      messages: messages.map((message) => new MessagePresenter(message)),
    };
  }
  async findOne(id: string): Promise<MessagePresenter> {
    const queryBuilder = this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.from', 'from')
      .leftJoinAndSelect('message.to', 'to')
      .where('message.id = :id', { id })
      .select(['message', 'from.id', 'from.name', 'to.id', 'to.name']);

    const message = await queryBuilder.getOne();

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return new MessagePresenter(message);
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessagePresenter> {
    const message = await this.findOne(id);

    message.text = updateMessageDto?.text ?? message.text;
    message.read = updateMessageDto?.read ?? message.read;
    await this.messageRepository.save(message);
    return new MessagePresenter(message);
  }

  async remove(id: string): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    await this.messageRepository.remove(message);
  }
}
