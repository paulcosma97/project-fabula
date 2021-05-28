import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';
import websocketStoreFactory from './config/websocket-store.factory';
import dbFactory from './common/persistance/db.factory';
import { AuthGateway } from '../modules/accounts/gateways/auth.gateway';
import { ChatGateway } from './common/gateways/chat.gateway';
import { AuthService } from '../modules/accounts/services/auth.service';
import { ChatService } from './common/services/chat.service';

@Module({
    imports: [],
    controllers: [],
    providers: [websocketStoreFactory, dbFactory, PingGateway, AuthGateway, ChatGateway, AuthService, ChatService],
    exports: [websocketStoreFactory, dbFactory],
})
export class SharedModule {}
