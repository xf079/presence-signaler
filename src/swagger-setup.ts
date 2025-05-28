import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(
  app: INestApplication,
  configService: ConfigService,
): void {
  const path = configService.get<string>('APP_SWAGGER_PATH', 'api-docs');
  const HOST = configService.get<string>('APP_HOST') || '127.0.0.1';
  const PORT = configService.get<number>('APP_PORT') || 8081;
  const apiJsonUrl = 'api-json';
  const documentBuilder = new DocumentBuilder()
    .setTitle('Presence Signaler API')
    .setDescription(`Presence Signaler API文档`)
    .setVersion('1.0')
    .setExternalDoc('Api JSON Schema', apiJsonUrl);

  // auth security
  documentBuilder.addSecurity('Bearer', {
    description: '输入令牌（Enter the token）',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 保持登录
    },
    raw: ['json'],
    jsonDocumentUrl: apiJsonUrl,
  });

  // started log
  const logger = new Logger('SwaggerModule');
  logger.log(`Document running on http://${HOST}:${PORT}/${path}`);
}
