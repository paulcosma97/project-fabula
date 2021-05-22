import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';
import websocketStoreFactory from './config/websocket-store.factory';
import dbFactory from './common/persistance/db.factory';
import { AuthGateway } from './common/gateways/auth.gateway';
import { ChatGateway } from './common/gateways/chat.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [websocketStoreFactory, dbFactory, PingGateway, AuthGateway, ChatGateway],
    exports: [websocketStoreFactory, dbFactory],
})
export class SharedModule {}
