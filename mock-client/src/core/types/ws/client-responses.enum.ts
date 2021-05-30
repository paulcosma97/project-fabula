export enum ClientResponses {
    PING = '[Server] Pong',
    REGISTER = '[Server] Register',
    LOGIN = '[Server] Login',
    CHAT = '[Server] Chat',
    GAMESTATE = '[Server] GameState',
}

export const ClientResponsesKeyValues = Object.keys(ClientResponses).map((key) => ({
    key,
    value: ClientResponses[key],
}));
