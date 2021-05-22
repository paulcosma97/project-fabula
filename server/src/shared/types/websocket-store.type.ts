import { PlayerState } from './gamestate';
import {Seconds} from "./base.types";

export default interface WebsocketStore {
    getState(id: string): Promise<PlayerState>;
    setState(id: string, state: PlayerState, ttl: Seconds): Promise<void>;
}

export const WebsocketStoreToken = 'WebsocketStore';
