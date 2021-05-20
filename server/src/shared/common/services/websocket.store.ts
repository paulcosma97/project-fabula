import WebsocketStore from '../../types/websocket-store.type';
import { Injectable } from '@nestjs/common';
import { PlayerState } from '../../types/gamestate';

@Injectable()
export default class WebSocketStoreImpl implements WebsocketStore {
    private store = new Map<string, PlayerState>();

    async getState(id: string): Promise<PlayerState> {
        return this.store.get(id);
    }

    async setState(id: string, state: PlayerState): Promise<void> {
        this.store.set(id, state);
    }
}
