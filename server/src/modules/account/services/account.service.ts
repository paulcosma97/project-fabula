import { Inject, Injectable } from '@nestjs/common';
import {
    DatabaseConnection,
    DatabaseConnectionToken,
    InsertableEntity,
} from '../../../shared/common/persistance/db.types';
import { RegisterDto } from '../../../shared/types/auth/register.dto';
import { Account, AccountCollection } from '../../../shared/common/models/account.model';
import { LoginDto } from '../../../shared/types/auth/login.dto';
import { Collection } from 'mongodb';
import { RegisterFailure } from '../responses/register.response';
import { LoginFailure } from '../responses/login.response';

@Injectable()
export class AccountService {
    private collection: Collection<Account>;
    private defaultLoginFailure = new LoginFailure({ reason: 'Invalid email and password combination.' });

    constructor(@Inject(DatabaseConnectionToken) dbConnection: DatabaseConnection) {
        this.collection = dbConnection.collection<Account>(AccountCollection);
    }

    async register(registerDto: RegisterDto): Promise<void> {
        const accountWithSameEmail = await this.collection.findOne({
            email: registerDto.email,
        });

        if (accountWithSameEmail) {
            throw new RegisterFailure({
                email: 'Email address already exists.',
            });
        }

        const account = {
            email: registerDto.email,
            password: registerDto.password,
            characterIds: [],
        } as InsertableEntity<Account>;
        await this.collection.insertOne(account);
    }

    async login(loginDto: LoginDto): Promise<void> {
        const referencedAccount = await this.collection.findOne({ email: loginDto.email });
        if (!referencedAccount) {
            throw this.defaultLoginFailure;
        }

        if (referencedAccount.password !== loginDto.password) {
            throw this.defaultLoginFailure;
        }
    }
}
