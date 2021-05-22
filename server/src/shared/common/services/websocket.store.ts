import WebsocketStore from '../../types/websocket-store.type';
import { Injectable } from '@nestjs/common';
import { PlayerState } from '../../types/gamestate';
import { Seconds } from '../../types/base.types';

@Injectable()
export default class WebSocketStoreImpl implements WebsocketStore {
    private store = new Map<string, { value: PlayerState; ttlId: any }>();

    async getState(id: string): Promise<PlayerState> {
        return this.store.get(id)?.value;
    }

    async setState(id: string, state: PlayerState, ttl: Seconds): Promise<void> {
        const existing = this.store.get(id);

        if (existing) {
            clearTimeout(existing.ttlId);
        }

        this.store.set(id, { value: state, ttlId: setTimeout(() => this.store.delete(id), ttl * 1000) });
    }
}
