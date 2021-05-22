import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConnection, DatabaseConnectionToken, InsertableEntity } from '../persistance/db.types';
import { RegisterDto } from '../../types/auth/register.dto';
import { Account, AccountCollection } from '../../../core/models/account.model';
import { LoginDto } from '../../types/auth/login.dto';
import { Collection } from 'mongodb';

@Injectable()
export class AuthService {
    collection: Collection<Account>;
    constructor(@Inject(DatabaseConnectionToken) private dbConnection: DatabaseConnection) {
        this.collection = dbConnection.collection<Account>(AccountCollection);
    }

    async register(registerDto: RegisterDto): Promise<void> {
        const account = {
            email: registerDto.email,
            password: registerDto.password,
            characterIds: [],
        } as InsertableEntity<Account>;
        await this.collection.insertOne(account);
    }

    async login(loginDto: LoginDto): Promise<boolean> {
        const referencedAccount = await this.collection.findOne({ email: loginDto.email });
        if (!referencedAccount) {
            return false;
        }
        return referencedAccount.password === loginDto.password;
    }
}
