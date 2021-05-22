import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';
import websocketStoreFactory from './config/websocket-store.factory';
import dbFactory from './common/persistance/db.factory';

@Module({
    imports: [],
    controllers: [],
    providers: [websocketStoreFactory, dbFactory, PingGateway],
    exports: [websocketStoreFactory, dbFactory],
})
export class SharedModule {}
