import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WsSubscriptionsEnum } from '../../types/ws/ws-subscriptions.enum';
import { WsResponsesEnum } from '../../types/ws/ws-responses.enum';
import WebSocket from 'ws';

@WebSocketGateway()
export class GameStateGateway {
    @SubscribeMessage(WsSubscriptionsEnum.GET_GAMESTATE)
    async findAll(@MessageBody() body: any, @ConnectedSocket() client: WebSocket): Promise<void> {
        client.emit(WsResponsesEnum.GAMESTATE, null);
    }
}
