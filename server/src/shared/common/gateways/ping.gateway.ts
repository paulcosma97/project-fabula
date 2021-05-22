import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'net';

@WebSocketGateway()
export class PingGateway {
    @SubscribeMessage('[Client] Ping')
    async findAll(@MessageBody() body: any, @ConnectedSocket() socket: Socket): Promise<WsResponse<null>> {
        Logger.log(`Got message from client ${JSON.stringify(body)}`, 'PingGateway');
        return {
            event: '[Server] Pong',
            data: null,
        };
    }
}
