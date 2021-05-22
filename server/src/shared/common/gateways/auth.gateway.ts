import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { WsSubscriptions } from '../../types/ws/ws-subscriptions.enum';
import { WsResponses } from '../../types/ws/ws-responses.enum';
import { RegisterDto } from '../../types/auth/register.dto';
import { LoginDto } from '../../types/auth/login.dto';
import { Socket } from 'net';
import { AuthService } from '../services/auth.service';

@WebSocketGateway()
export class AuthGateway {
    constructor(private authService: AuthService) {}

    @SubscribeMessage(WsSubscriptions.REGISTER)
    async register(@MessageBody() body: RegisterDto): Promise<void> {
        await this.authService.register(body);
    }

    @SubscribeMessage(WsSubscriptions.LOGIN)
    async login(@MessageBody() body: LoginDto, @ConnectedSocket() client: Socket): Promise<WsResponse<boolean>> {
        const isLoggedIn = await this.authService.login(body);
        return {
            event: WsResponses.LOGIN,
            data: isLoggedIn,
        };
    }
}
