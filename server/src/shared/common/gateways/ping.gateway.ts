import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { WsResponsesEnum } from '../../types/ws/ws-responses.enum';
import { WsSubscriptionsEnum } from '../../types/ws/ws-subscriptions.enum';

@WebSocketGateway()
export class PingGateway {
    @SubscribeMessage(WsSubscriptionsEnum.PING)
    async findAll(@MessageBody() body: any): Promise<WsResponse<void>> {
        Logger.log(`Got message from client ${JSON.stringify(body)}`, 'PingGateway');
        return {
            event: WsResponsesEnum.PING,
            data: null,
        };
    }
}
