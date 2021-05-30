import { WebsocketConfig } from '../config/websocket.config';
import { ServerSubscriptions } from '../types/ws/server-subscriptions.enum';
import { ChatMessageModel } from '../types/chat/chat-message.model';
import { WebsocketEventType } from '../types/ws/websocket-event.type';
import store from '../store/store';
import { AddEvent } from '../store/store.actions';
import { LoginModel } from '../types/auth/login.model';
import { RegisterModel } from '../types/auth/register.model';

export class WebsocketService {
    client: WebSocket;

    constructor() {
        this.setup();
    }

    setup(): void {
        this.client = new WebSocket(WebsocketConfig.host);
        this.client.onopen = () => {
            console.log('Websocket Connection Opened');
            const payload: WebsocketEventType = {
                timestamp: Date.now(),
                type: 'Connection Open',
                body: '',
            };
            const dispatchEvent = new AddEvent(payload);
            store.dispatch({ ...dispatchEvent });
        };
        this.client.onerror = (error) => {
            console.log('Websocket error');
            const payload: WebsocketEventType = {
                timestamp: Date.now(),
                type: 'Websocket Error',
                body: JSON.stringify(error),
            };
            const dispatchEvent = new AddEvent(payload);
            store.dispatch({ ...dispatchEvent });
        };
        this.client.onclose = () => {
            console.log('Websocket Connection Closed');
            const payload: WebsocketEventType = {
                timestamp: Date.now(),
                type: 'Connection Closed',
                body: '',
            };
            const dispatchEvent = new AddEvent(payload);
            store.dispatch({ ...dispatchEvent });
        };
        this.client.onmessage = (event: MessageEvent) => {
            const eventPayload = JSON.parse(event.data);
            const payload: WebsocketEventType = {
                timestamp: Date.now(),
                type: eventPayload.event,
                body: JSON.stringify(eventPayload.data),
            };
            const dispatchEvent = new AddEvent(payload);
            store.dispatch({ ...dispatchEvent });
        };
    }

    async ping(): Promise<void> {
        this.client.send(JSON.stringify({ event: ServerSubscriptions.PING, data: null }));
    }

    async chat(message: ChatMessageModel): Promise<void> {
        this.client.send(JSON.stringify({ event: ServerSubscriptions.CHAT, data: message }));
    }

    async login(payload: LoginModel): Promise<void> {
        this.client.send(JSON.stringify({ event: ServerSubscriptions.LOGIN, data: payload }));
    }

    async register(payload: RegisterModel): Promise<void> {
        this.client.send(JSON.stringify({ event: ServerSubscriptions.REGISTER, data: payload }));
    }
}

const WebsocketServiceInstance = new WebsocketService();
export default WebsocketServiceInstance;
