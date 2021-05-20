import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';
import websocketStoreFactory from './config/websocket-store.factory';

@Module({
    imports: [],
    controllers: [],
    providers: [websocketStoreFactory, PingGateway],
    exports: [websocketStoreFactory],
})
export class SharedModule {}
