import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {WsSubscriptions} from '../../../shared/types/ws/ws-subscriptions.enum';
import {WsResponses} from '../../../shared/types/ws/ws-responses.enum';
import {RegisterDto} from '../../../shared/types/auth/register.dto';
import {LoginDto} from '../../../shared/types/auth/login.dto';
import {Socket} from 'net';
import {AuthService} from '../services/auth.service';
import {FabulaGateway} from "../../../shared/common/responses/base.response";
import {RegisterSuccess} from "../responses/register.response";

@WebSocketGateway()
export class AuthGateway {
    constructor(private authService: AuthService) {}

    @FabulaGateway(WsSubscriptions.REGISTER, RegisterSuccess)
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
