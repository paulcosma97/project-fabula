import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { WsSubscriptions } from '../../../shared/types/ws/ws-subscriptions.enum';
import { WsResponses } from '../../../shared/types/ws/ws-responses.enum';
import { RegisterDto } from '../../../shared/types/auth/register.dto';
import { LoginDto } from '../../../shared/types/auth/login.dto';
import { AccountService } from '../services/account.service';
import { FabulaGateway } from '../../../shared/common/responses/base.response';
import { RegisterSuccess } from '../responses/register.response';

@WebSocketGateway()
export class AccountGateway {
    constructor(private authService: AccountService) {}

    @FabulaGateway(WsSubscriptions.REGISTER, RegisterSuccess)
    async register(@MessageBody() body: RegisterDto): Promise<void> {
        await this.authService.register(body);
    }

    @SubscribeMessage(WsSubscriptions.LOGIN)
    async login(@MessageBody() body: LoginDto): Promise<WsResponse<boolean>> {
        const isLoggedIn = await this.authService.login(body);
        return {
            event: WsResponses.LOGIN,
            data: isLoggedIn,
        };
    }
}
