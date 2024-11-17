import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from 'src/infra/database/typeorm/typeorm.module';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';

@Module({
  imports: [
    EnvConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmDatabaseModule,
  ],
})
export class ConfigsModule {}
