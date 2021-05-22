import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WsSubscriptions } from '../../types/ws/ws-subscriptions.enum';
import { ChatMessageDto } from '../../types/chat/chat-message.dto';
import { ChatService } from '../services/chat.service';
import WebSocket from 'ws';

@WebSocketGateway()
export class ChatGateway {
    constructor(private chatService: ChatService) {}

    @SubscribeMessage(WsSubscriptions.CHAT)
    async chat(@MessageBody() body: ChatMessageDto, @ConnectedSocket() client: WebSocket): Promise<void> {
        await this.chatService.processMessage(body, client);
    }
}
