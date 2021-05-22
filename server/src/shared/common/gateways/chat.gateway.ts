import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { WsSubscriptionsEnum } from '../../types/ws/ws-subscriptions.enum';
import { WsResponsesEnum } from '../../types/ws/ws-responses.enum';
import { ChatMessageDto } from '../../types/chat/chat-message.dto';
import { ChatService } from '../services/chat.service';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) {}

    @SubscribeMessage(WsSubscriptionsEnum.CHAT)
    async chat(
        @MessageBody() body: ChatMessageDto,
        @ConnectedSocket() client: WebSocket,
    ): Promise<WsResponse<ChatMessageDto>> {
        const resultMessage = await this.chatService.processMessage(body, client, this.server.clients);
        return {
            event: WsResponsesEnum.CHAT,
            data: resultMessage,
        };
    }
}
