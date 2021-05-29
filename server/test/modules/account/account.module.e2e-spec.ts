import { AccountGateway } from '../../../src/modules/account/gateways/account.gateway';
import { DemistifyGateway } from '../../utils/gateway.utils';
import { RegisterResponseEvents } from '../../../src/modules/account/responses/register.response';
import { AccountModule } from '../../../src/modules/account/account.module';
import { usingApp } from '../../utils/bootstrap';

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
});
