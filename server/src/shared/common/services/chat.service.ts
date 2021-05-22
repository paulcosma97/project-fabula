import { ChatMessageDto } from '../../types/chat/chat-message.dto';
import { Injectable } from '@nestjs/common';
import BroadcastChatMessageDto from '../../types/chat/broadcast-chat-message.dto';
import PrivateChatMessageDto from '../../types/chat/private-chat-message.dto';
import WebSocket from 'ws';

@Injectable()
export class ChatService {
    async processMessage(
        message: ChatMessageDto,
        messageSocket: WebSocket,
        otherSockets: Set<WebSocket>,
    ): Promise<ChatMessageDto> {
        switch (message.type) {
            case BroadcastChatMessageDto.TYPE_SELECTOR:
                return this.processBroadcastMessage(message as BroadcastChatMessageDto);
            case PrivateChatMessageDto.TYPE_SELECTOR:
                return this.processPrivateMessage(message as PrivateChatMessageDto);
        }
    }

    private async processBroadcastMessage(message: BroadcastChatMessageDto): Promise<BroadcastChatMessageDto> {
        return null;
    }

    private async processPrivateMessage(message: PrivateChatMessageDto): Promise<PrivateChatMessageDto> {
        return null;
    }
}
