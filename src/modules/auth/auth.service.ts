import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidCredentialsError } from 'src/common/errors/invalid-credentials-error';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SigninDto } from './dtos/sign-in.dto';
import { JwtTokenService } from './encrypter/jwt/jwt.service';
import { HashingService } from './hashing/hasher.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtTokenService,
  ) {}
  async signIn(signInDto: SigninDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const hashPasswordMatches = await this.hashingService.compare(
      password,
      user.passwordHash,
    );

    if (!hashPasswordMatches) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const accessToken = await this.jwtService.generateJwt(user.id);

    return accessToken;
  }
}
