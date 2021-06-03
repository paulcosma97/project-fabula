import { AccountGateway } from '../../../src/modules/account/gateways/account.gateway';
import { DemistifyGateway } from '../../utils/gateway.utils';
import {
    RegisterFailureReason,
    RegisterResponseEvents,
} from '../../../src/modules/account/responses/register.response';
import { AccountModule } from '../../../src/modules/account/account.module';
import { usingApp } from '../../utils/bootstrap';
import { INestApplication } from '@nestjs/common';
import { AccountService } from '../../../src/modules/account/services/account.service';
import { LoginFailureReason, LoginResponseEvents } from '../../../src/modules/account/responses/login.response';

describe('Account Module', () => {
    const metadata = { imports: [AccountModule] };

    describe('Register', () => {
        it(
            'Should succeed',
            usingApp(metadata, async (app, assertPerformance) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                const result = await assertPerformance(() =>
                    accountGateway.register({
                        email: 'test@test.com',
                        password: 'password',
                    }),
                );

                expect(result).toHaveProperty('event', RegisterResponseEvents.RegisterSuccess);
                expect(result).not.toHaveProperty('data');
            }),
        );

        it(
            'Should fail when email already exists',
            usingApp(metadata, async (app, assertPerformance) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                await accountGateway.register({
                    email: 'test@test.com',
                    password: 'password',
                });

                const result = await assertPerformance(() =>
                    accountGateway.register({
                        email: 'test@test.com',
                        password: 'password',
                    }),
                );

                expect(result).toHaveProperty('event', RegisterResponseEvents.RegisterFailure);
                expect(result).toHaveProperty('data', RegisterFailureReason.EmailAlreadyExists);
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

        it(
            'Should succeed',
            usingApp(metadata, async (app, assertPerformance) => {
                await setupDatabase(app);
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);
                const result = await assertPerformance(() =>
                    accountGateway.login({
                        email: 'player@fabula.io',
                        password: 'password',
                    }),
                );

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginSuccess);
                expect(result).not.toHaveProperty('data');
            }),
        );

        it(
            'Should fail when email does not exist',
            usingApp(metadata, async (app, assertPerformance) => {
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                const result = await assertPerformance(() =>
                    accountGateway.login({
                        email: 'unregistered@fabula.io',
                        password: 'password',
                    }),
                );

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginFailure);
                expect(result).toHaveProperty('data', LoginFailureReason.WrongEmailPasswordCombination);
            }),
        );

        it(
            'Should fail when password is wrong',
            usingApp(metadata, async (app, assertPerformance) => {
                await setupDatabase(app);
                const accountGateway: DemistifyGateway<AccountGateway> = app.get(AccountGateway);

                const result = await assertPerformance(() =>
                    accountGateway.login({
                        email: 'player@fabula.io',
                        password: 'passw0rd',
                    }),
                );

                expect(result).toHaveProperty('event', LoginResponseEvents.LoginFailure);
                expect(result).toHaveProperty('data', LoginFailureReason.WrongEmailPasswordCombination);
            }),
        );
    });
});
