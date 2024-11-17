import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './env-config.service';
import appConfig from './env.config';
@Module({
  imports: [EnvConfigModule.forRoot(), EnvConfigModule.forFeature(appConfig)],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return super.forRoot({
      ...options,
      envFilePath: [join(__dirname, `../../../.env.${process.env.NODE_ENV}`)],
    });
  }
}
