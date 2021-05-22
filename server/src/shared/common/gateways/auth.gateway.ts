import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { WsSubscriptionsEnum } from '../../types/ws/ws-subscriptions.enum';
import { WsResponsesEnum } from '../../types/ws/ws-responses.enum';
import { RegisterDto } from '../../types/auth/register.dto';
import { LoginDto } from '../../types/auth/login.dto';
import { Socket } from 'net';

@WebSocketGateway()
export class AuthGateway {
    @SubscribeMessage(WsSubscriptionsEnum.REGISTER)
    async register(@MessageBody() body: RegisterDto): Promise<WsResponse<void>> {
        return {
            event: WsResponsesEnum.REGISTER,
            data: null,
        };
    }

    @SubscribeMessage(WsSubscriptionsEnum.LOGIN)
    async login(@MessageBody() body: LoginDto, @ConnectedSocket() client: Socket): Promise<WsResponse<void>> {
        return {
            event: WsResponsesEnum.LOGIN,
            data: null,
        };
    }
}
