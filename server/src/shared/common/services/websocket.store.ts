import WebsocketStore from '../../types/websocket-store.type';
import { Injectable } from '@nestjs/common';
import { FK } from '../persistance/db.types';
import Character from '../../../core/models/character.model';
import WebSocket from 'ws';

@Injectable()
export default class WebSocketStoreImpl implements WebsocketStore {
    private store = new Map<FK<Account>, WebSocket>();

    async get(fk: FK<Character>): Promise<WebSocket | null> {
        return this.store.get(fk) || null;
    }

    async getAll(): Promise<WebSocket[]> {
        return [...this.store.values()];
    }

    async set(fk: FK<Character>, socket: WebSocket): Promise<void> {
        this.store.set(fk, socket);
    }
}
