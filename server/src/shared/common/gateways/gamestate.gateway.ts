import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WsSubscriptions } from '../../types/ws/ws-subscriptions.enum';
import { WsResponses } from '../../types/ws/ws-responses.enum';
import WebSocket from 'ws';

@WebSocketGateway()
export class GameStateGateway {
    @SubscribeMessage(WsSubscriptions.GET_GAMESTATE)
    async findAll(@MessageBody() body: any, @ConnectedSocket() client: WebSocket): Promise<void> {
        client.emit(WsResponses.GAMESTATE, null);
    }
}
