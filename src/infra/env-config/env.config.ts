import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME,
  },
  node: {
    env: process.env.NODE_ENV,
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 60,
    max: parseInt(process.env.CACHE_MAX, 10) || 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresInSeconds: parseInt(process.env.JWT_EXPIRATION),
  },
}));
