import { bootstrap } from '../src/main';
import * as WebSocket from 'ws';
import FabulaMessage from '../src/shared/common/responses/base.response';
import { WsResponses } from '../src/shared/types/ws/ws-responses.enum';
import { ConfigService } from '@nestjs/config';
import { HTTPConfiguration } from '../src/shared/types/config.types';

describe.only('Main', () => {
    it('Should create a WebSocket and respond to Ping message', async () => {
        const app = await bootstrap();
        const port = app.get(ConfigService).get<HTTPConfiguration['port']>('http.port', 3000);
        const socket = new WebSocket('ws://127.0.0.1:' + port);
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    event: '[Client] Ping',
                }),
            );
        };

        let pass: () => void;
        let fail: (e?: any) => void;
        const asyncWaiter = new Promise<void>((resolve, reject) => {
            pass = resolve;
            fail = reject;
        });

        // @ts-ignore
        const failTimer = global.setTimeout(fail, 100);

        socket.onmessage = (event) => {
            const message: FabulaMessage = JSON.parse(event.data.toString());

            if (message.event === WsResponses.PING) {
                global.clearTimeout(failTimer);
                socket.close();
                pass();
            }
        };

        // @ts-ignore
        socket.onerror = fail;

        return asyncWaiter.then(() => app.close());
    });
});
