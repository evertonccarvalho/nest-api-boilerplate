import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from './env.config';
// import { EnvConfig } from './env-config.interface';

@Injectable()
export class EnvConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}
  CacheMax(): number {
    throw new Error('Method not implemented.');
  }

  NodeEnv(): string {
    return this.appConfiguration.node.env;
  }

  AppName(): string {
    return this.appConfiguration.app.name;
  }

  AppPort(): number {
    return +this.appConfiguration.app.port;
  }

  DbHost(): string {
    return this.appConfiguration.db.host;
  }

  DbPort(): number {
    return +this.appConfiguration.db.port;
  }

  DbUsername(): string {
    return this.appConfiguration.db.username;
  }

  DbPassword(): string {
    return this.appConfiguration.db.password;
  }

  DbDatabaseName(): string {
    return this.appConfiguration.db.database;
  }

  RedisHost(): string {
    return this.appConfiguration.redis.host;
  }

  RedisPort(): number {
    return +this.appConfiguration.redis.port;
  }

  CacheTTL(): number {
    return +this.appConfiguration.cache.ttl;
  }

  JwtSecret(): string {
    return this.appConfiguration.jwt.secret;
  }

  JwtExpiresInSeconds(): number {
    return +this.appConfiguration.jwt.expiresInSeconds;
  }
}
