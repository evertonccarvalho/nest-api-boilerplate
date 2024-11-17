import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  if (!configService.get('App.isProduction')) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('Sistema de autenticação JWT.')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Informar o JWT para autorizar o acesso',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/documentation', app, document);
  }
}
