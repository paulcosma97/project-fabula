import { Module } from '@nestjs/common';
import { PingGateway } from './common/gateways/ping.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [PingGateway],
})
export class SharedModule {}
