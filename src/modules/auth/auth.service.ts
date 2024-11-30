import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidCredentialsError } from 'src/common/errors/invalid-credentials-error';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import jwtConfig from './config/jwt.config';
import { SigninDto } from './dtos/sign-in.dto';
import { HashingService } from './hashing/hasher.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
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

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.expiresIn,
      },
    );

    return { accessToken };
  }
}
