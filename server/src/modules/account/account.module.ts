import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { AccountGateway } from './gateways/account.gateway';
import { AccountService } from './services/account.service';

@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [AccountGateway, AccountService],
    exports: [AccountGateway, AccountService],
})
export class AccountModule {}
