import { PlayerState } from './gamestate';

export default interface WebsocketStore {
    getState(id: string): Promise<PlayerState>;
    setState(id: string, state: PlayerState): Promise<void>;
}

export const WebsocketStoreToken = 'WebsocketStore';
