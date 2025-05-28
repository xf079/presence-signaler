import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '@/swagger-setup';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const cors = configService.get<boolean>('APP_CORS');
  if (cors) {
    app.enableCors();
  }
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api', { exclude: ['sitemap.xml'] });

  const HOST = configService.get<string>('APP_HOST') || '127.0.0.1';
  const PORT = configService.get<number>('APP_PORT') || 8081;

  swaggerSetup(app, configService);

  await app.listen(PORT, HOST, () => {
    logLogo();
    Logger.log(`Listening at http://${HOST}:${PORT}`);
  });
}

function logLogo() {
  Logger.log('   ________               __  ____      ___');
  Logger.log('  / ____/ /_  ____  _____/ /_/ __/___  / (_)___');
  Logger.log(' / / __/ __ \\/ __ \\/ ___/ __/ /_/ __ \\/ / / __ \\');
  Logger.log('/ /_/ / / / / /_/ (__  ) /_/ __/ /_/ / / / /_/ /');
  Logger.log(`\\____/_/ /_/\\____/____/\\__/_/  \\____/_/_/\\____/ 0.0.1`);
  Logger.log('');
}

void bootstrap();
