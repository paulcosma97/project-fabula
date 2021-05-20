import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import WebsocketStore, { WebsocketStoreToken } from '../types/websocket-store.type';
import WebSocketStoreImpl from '../common/services/websocket.store';

const websocketStoreFactory: FactoryProvider<WebsocketStore> = {
    provide: WebsocketStoreToken,
    useFactory: () => new WebSocketStoreImpl(),
};

export default websocketStoreFactory;
