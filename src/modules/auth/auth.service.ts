import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidCredentialsError } from 'src/common/errors/invalid-credentials-error';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
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
      where: { email, isActive: true },
    });

    if (!user) {
      throw new NotFoundException(`User unauthorized`);
    }

    const hashPasswordMatches = await this.hashingService.compare(
      password,
      user.passwordHash,
    );

    if (!hashPasswordMatches) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    return await this.jwtService.generateTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const res = await this.jwtService.verifyJwt(refreshTokenDto.refreshToken);

      const user = await this.userRepository.findOne({
        where: { id: res.sub, isActive: true },
      });

      if (!user) {
        throw new NotFoundException(`User unauthorized`);
      }
      return this.jwtService.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
