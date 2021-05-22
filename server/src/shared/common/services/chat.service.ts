import { ChatMessageDto } from '../../types/chat/chat-message.dto';
import { Inject, Injectable } from '@nestjs/common';
import BroadcastChatMessageDto from '../../types/chat/broadcast-chat-message.dto';
import PrivateChatMessageDto from '../../types/chat/private-chat-message.dto';
import WebSocket from 'ws';
import WebsocketStore, { WebsocketStoreToken } from '../../types/websocket-store.type';
import { WsResponses } from '../../types/ws/ws-responses.enum';
import { ObjectId } from 'mongodb';

@Injectable()
export class ChatService {
    constructor(@Inject(WebsocketStoreToken) private websocketStore: WebsocketStore) {}

    async processMessage(message: ChatMessageDto, sourceSocket: WebSocket): Promise<void> {
        switch (message.type) {
            case BroadcastChatMessageDto.TYPE_SELECTOR:
                return this.processBroadcastMessage(message as BroadcastChatMessageDto, sourceSocket);
            case PrivateChatMessageDto.TYPE_SELECTOR:
                return this.processPrivateMessage(message as PrivateChatMessageDto);
        }
        throw new Error('Invalid Message');
    }

    private async processBroadcastMessage(message: BroadcastChatMessageDto, sourceSocket: WebSocket): Promise<void> {
        const sockets = await this.websocketStore.getAll();
        for (const socket of sockets) {
            // range logic
            if (socket !== sourceSocket) {
                socket.emit(WsResponses.CHAT, message);
            }
        }
    }

    private async processPrivateMessage(message: PrivateChatMessageDto): Promise<void> {
        const accountSocket = await this.websocketStore.get(new ObjectId(message.character));
        if (accountSocket) {
            accountSocket.emit(WsResponses.CHAT, message);
        }
        // TODO: return failure
    }
}
