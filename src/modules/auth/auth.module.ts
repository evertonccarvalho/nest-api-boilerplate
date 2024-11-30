import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationJwtModule } from './encrypter/jwt/jwt.module';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hasher.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), ApplicationJwtModule],
  controllers: [AuthController],
  exports: [HashingService],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
  ],
})
export class AuthModule {}
