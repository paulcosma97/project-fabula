import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { DatabaseConfiguration, DatabaseProvider } from '../../types/config.types';
import { DatabaseConnection, DatabaseConnectionToken } from './db.types';
import * as Bluebird from 'bluebird';

async function createDBConnection(
    db: Omit<Omit<DatabaseConfiguration, 'provider'>, 'name'> | string,
    name: string,
): Promise<DatabaseConnection> {
    const url = typeof db === 'string' ? db : `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/fabuladb`;
    const client = new MongoClient(url, {
        useUnifiedTopology: true,
    });
    await client.connect();
    const conn: DatabaseConnection = (await client.db(name)) as any;
    conn.close = Bluebird.promisify(client.close, { context: client });
    return conn;
}

const dbFactory: FactoryProvider<Promise<DatabaseConnection>> = {
    provide: DatabaseConnectionToken,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const db = configService.get<DatabaseConfiguration>('database');

        if (!db) {
            throw new Error('Database configuration is missing.');
        }

        if (db.provider === DatabaseProvider.MongoDB) {
            return createDBConnection(db, db.name);
        } else if (db.provider === DatabaseProvider.InMemoryMongoDB) {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const memServer = await MongoMemoryServer.create();
            const conn = await createDBConnection(await memServer.getUri(true), await memServer.getDbName());
            conn.close = () => memServer.stop() as any;
            return conn;
        }

        throw new Error(
            `Invalid database provider '${db.provider}'. Available providers: [${Object.values(DatabaseProvider).join(
                ', ',
            )}].`,
        );
    },
};

export default dbFactory;
