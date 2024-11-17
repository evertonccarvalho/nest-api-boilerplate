import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [
    EnvConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) => {
        console.log(configService); // Log the configService
        return {
          type: 'postgres',
          host: configService.DbHost(),
          port: configService.DbPort(),
          username: configService.DbUsername(),
          password: configService.DbPassword(),
          database: configService.DbDatabaseName(),
          entities: [Message, User], // Certifique-se de importar todas as entidades aqui
          synchronize: true, // Altere para `false` em produção
        };
      },
    }),
  ],
})
export class TypeOrmDatabaseModule {}
