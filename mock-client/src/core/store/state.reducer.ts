import { StoreActions, StoreActionsUnion } from './store.actions';
import { WebsocketEventType } from '../types/ws/websocket-event.type';

export interface StoreState {
    websocketEvents: WebsocketEventType[];
}

const initialStoreState: StoreState = {
    websocketEvents: [],
};

export default function stateReducer(state: StoreState = initialStoreState, action: StoreActionsUnion): StoreState {
    switch (action.type) {
        case StoreActions.ADD_EVENT:
            return {
                ...state,
                websocketEvents: state.websocketEvents.concat([action.payload]),
            };
        default:
            return state;
    }
}

export const selectWebSocketEvents = (state: StoreState) => state.websocketEvents;
