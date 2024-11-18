import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env-config.service';
import appConfig from './env.config';
@Module({
  imports: [EnvConfigModule.forRoot(), EnvConfigModule.forFeature(appConfig)],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {}
