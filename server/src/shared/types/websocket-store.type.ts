import { FK } from '../common/persistance/db.types';
import WebSocket from 'ws';

export default interface WebsocketStore {
    get(fk: FK<Account>): Promise<WebSocket | null>;
    getAll(): Promise<WebSocket[]>;
    set(fk: FK<Account>, state: WebSocket): Promise<void>;
}

export const WebsocketStoreToken = 'WebsocketStore';
