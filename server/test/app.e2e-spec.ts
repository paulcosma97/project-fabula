import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import {AuthGateway} from "../src/modules/accounts/gateways/auth.gateway";
import { RegisterDto } from 'src/shared/types/auth/register.dto';
import {DemistifyGateway} from "./utils/gateway.utils";
import {RegisterResponseEvents} from "../src/modules/accounts/responses/register.response";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', async () => {
        const authgw: DemistifyGateway<AuthGateway> = app.get(AuthGateway);
        const result = await authgw.register({
            email: 'test@test.com' + Math.round(Math.random() * 1000),
            password: 'password'
        });

        expect(result).toHaveProperty('event', RegisterResponseEvents.RegisterSuccess);
        expect(result).not.toHaveProperty('data');
    });
});
