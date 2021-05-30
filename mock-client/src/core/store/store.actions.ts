import { Action } from '../types/store.types';
import { WebsocketEventType } from '../types/ws/websocket-event.type';

export enum StoreActions {
    ADD_EVENT = 'ADD_EVENT',
}

export class AddEvent implements Action {
    readonly type = StoreActions.ADD_EVENT;
    constructor(public payload: WebsocketEventType) {}
}

export type StoreActionsUnion = AddEvent;
