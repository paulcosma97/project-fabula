import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';
import { DatabaseConfiguration } from '../../types/config.types';
import { Logger } from '@nestjs/common';
import { DatabaseConnectionToken } from './db.types';

const dbFactory: FactoryProvider<Promise<Db>> = {
    provide: DatabaseConnectionToken,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const db = configService.get<DatabaseConfiguration>('database');

        if (!db) {
            Logger.error('Database configuration is missing.', 'DBFactory');
            throw new Error();
        }

        const url = `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/fabuladb`;
        console.log(url);
        console.dir(db);
        const client = new MongoClient(url, {
            useUnifiedTopology: true,
        });
        await client.connect();
        return client.db(db.name);
    },
};

export default dbFactory;
