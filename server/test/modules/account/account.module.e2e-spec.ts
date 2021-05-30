import { AccountGateway } from '../../../src/modules/account/gateways/account.gateway';
import { DemistifyGateway } from '../../utils/gateway.utils';
import { RegisterResponseEvents } from '../../../src/modules/account/responses/register.response';
import { AccountModule } from '../../../src/modules/account/account.module';
import { usingApp } from '../../utils/bootstrap';
import { INestApplication } from '@nestjs/common';
import { AccountService } from '../../../src/modules/account/services/account.service';
import { LoginResponseEvents } from '../../../src/modules/account/responses/login.response';

describe('Account Module', () => {
    const metadata = { imports: [AccountModule] };

    describe('Register', () => {
        it.concurrent(
            'Should succeed',
            usingApp(metadata, async (app) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);
                const result = await accountGateway.register({
                    email: 'test@test.com',
                    password: 'password',
                });

                expect(result).toHaveProperty('event', RegisterResponseEvents.RegisterSuccess);
                expect(result).not.toHaveProperty('data');
            }),
        );

        it.concurrent(
            'Should fail when email already exists',
            usingApp(metadata, async (app) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                await accountGateway.register({
                    email: 'test@test.com',
                    password: 'password',
                });

                const result = await accountGateway.register({
                    email: 'test@test.com',
                    password: 'password',
                });

                expect(result).toHaveProperty('event', RegisterResponseEvents.RegisterFailure);
                expect(result).toHaveProperty('data.email');
            }),
        );
    });
    describe('Login', () => {
        const setupDatabase = async (app: INestApplication) => {
            await app.get<AccountService>(AccountService).register({
                email: 'player@fabula.io',
                password: 'password',
            });
        };

        it.concurrent(
            'Should succeed',
            usingApp(metadata, async (app) => {
                await setupDatabase(app);
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);
                const result = await accountGateway.login({
                    email: 'player@fabula.io',
                    password: 'password',
                });

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginSuccess);
                expect(result).not.toHaveProperty('data');
            }),
        );

        it.concurrent(
            'Should fail when email does not exist',
            usingApp(metadata, async (app) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                const result = await accountGateway.login({
                    email: 'unregistered@fabula.io',
                    password: 'password',
                });

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginFailure);
                expect(result).toHaveProperty('data.reason');
            }),
        );

        it.concurrent(
            'Should fail when password is wrong',
            usingApp(metadata, async (app) => {
                await setupDatabase(app);
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                const result = await accountGateway.login({
                    email: 'player@fabula.io',
                    password: 'passw0rd',
                });

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginFailure);
                expect(result).toHaveProperty('data.reason');
            }),
        );
    });
});
