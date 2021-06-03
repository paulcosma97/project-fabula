import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { HTTPConfiguration } from './shared/types/config.types';
import { WsAdapter } from '@nestjs/platform-ws';

export async function bootstrap(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    app.useWebSocketAdapter(new WsAdapter(app));

    const port = app.get(ConfigService).get<HTTPConfiguration['port']>('http.port', 3000);
    await app.listen(port);
    Logger.log(`Accepting HTTP connection on port ${port}`, 'Bootstrap');
    return app;
}

if (process.env.FABULA_CONFIG_PROFILE !== 'e2e-test') {
    bootstrap();
}
