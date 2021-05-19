import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PingGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('[Client] Ping')
    async findAll(): Promise<WsResponse<void>> {
        return {
            event: '[Server] Pong',
            data: null,
        };
    }
}