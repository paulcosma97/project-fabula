import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HTTPConfiguration } from './shared/types/config.types';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = app.get(ConfigService).get<HTTPConfiguration['port']>('http.port', 3000);
    await app.listen(port);
    Logger.log(`Accepting HTTP connection on port ${port}`, 'Bootstrap');
}
bootstrap();
