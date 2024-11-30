import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from '../auth/hashing/hasher.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPresenter } from './presenters/user.presenter';
import { UsersQuery } from './queries/users.query';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException('email already exists');
    }

    const passwordHash = await this.hashingService.hash(password);
    try {
      const user = this.userRepository.create({ name, email, passwordHash });
      await this.userRepository.save(user);
    } catch (error: any) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('email already exists');
      }
      throw error;
    }
  }

  async findAll(
    query: UsersQuery,
  ): Promise<{ users: UserPresenter[]; count: number }> {
    const [users, count] = await this.userRepository.findAndCount({
      take: query.limit ?? undefined,
      skip: query.offset ?? undefined,
      order: { createdAt: query.sort ?? 'DESC' },
    });

    return {
      count,
      users: users.map((message) => new UserPresenter(message)),
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserPresenter(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      name: updateUserDto.name,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.save(user);
    return new UserPresenter(user);
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const passwordHash = await this.hashingService.hash(
      updateUserPasswordDto.password,
    );

    const user = await this.userRepository.preload({
      id,
      passwordHash,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.save(user);
    return new UserPresenter(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.remove(user);
  }
}
