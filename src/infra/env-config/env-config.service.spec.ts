import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigModule } from './env-config.module';
import { EnvConfigService } from './env-config.service';
import envConfig from './env.config';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EnvConfigModule.forRoot(),
        EnvConfigModule.forFeature(envConfig),
      ],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the variable APP_NAME', () => {
    expect(sut.AppName()).toBe('nestjs-api');
  });

  it('should return the variable PORT', () => {
    expect(sut.AppPort()).toBe(3000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(sut.NodeEnv()).toBe('test');
  });

  it('should return the variable DB_HOST', () => {
    expect(sut.DbHost()).toBe('localhost');
  });

  it('should return the variable DB_PORT', () => {
    expect(sut.DbPort()).toBe(5432);
  });

  it('should return the variable DB_USER', () => {
    expect(sut.DbUsername()).toBe('DB_USER');
  });

  it('should return the variable DB_PASSWORD', () => {
    expect(sut.DbPassword()).toBe('DB_PASSWORD');
  });

  it('should return the variable DB_DATABASE', () => {
    expect(sut.DbDatabaseName()).toBe('DB_DATABASE');
  });

  it('should return the variable REDIS_HOST', () => {
    expect(sut.RedisHost()).toBe('localhost');
  });

  it('should return the variable REDIS_PORT', () => {
    expect(sut.RedisPort()).toBe(6379);
  });

  it('should return the variable CACHE_TTL', () => {
    expect(sut.CacheTTL()).toBe(5);
  });

  it('should return the variable JWT_SECRET', () => {
    expect(sut.JwtSecret()).toBe('YOUR_JWT_SECRET_CODE');
  });

  it('should return the variable JWT_EXPIRATION', () => {
    expect(sut.JwtExpiresInSeconds()).toBe(86400);
  });
});
