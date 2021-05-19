import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('Client: Ping')
  findAll(@MessageBody() data: any): Observable<WsResponse<string>> {
    return of({ event: 'ping', data: 'ok:' + data });
  }
}
