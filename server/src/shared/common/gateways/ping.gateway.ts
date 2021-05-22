import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { WsResponses } from '../../types/ws/ws-responses.enum';
import { WsSubscriptions } from '../../types/ws/ws-subscriptions.enum';

@WebSocketGateway()
export class PingGateway {
    @SubscribeMessage(WsSubscriptions.PING)
    async findAll(@MessageBody() body: any): Promise<WsResponse<null>> {
        Logger.log(`Got message from client ${JSON.stringify(body)}`, 'PingGateway');
        return {
            event: WsResponses.PING,
            data: null,
        };
    }
}
