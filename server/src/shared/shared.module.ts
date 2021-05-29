import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';
import websocketStoreFactory from './config/websocket-store.factory';
import dbFactory from './common/persistance/db.factory';
import { ChatGateway } from './common/gateways/chat.gateway';
import { ChatService } from './common/services/chat.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config-loader';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
    controllers: [],
    providers: [websocketStoreFactory, dbFactory, PingGateway, ChatGateway, ChatService],
    exports: [websocketStoreFactory, dbFactory],
})
export class SharedModule {}
