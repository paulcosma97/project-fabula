import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseConnection, DatabaseConnectionToken } from '../../src/shared/common/persistance/db.types';

async function bootstrapTestApp(metadata: ModuleMetadata): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule(metadata).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    return app;
}

async function closeApp(app: INestApplication): Promise<void> {
    const conn = app.get<DatabaseConnection>(DatabaseConnectionToken);
    await conn.close();
    await app.close();
}

export function usingApp(metadata: ModuleMetadata, test: (app: INestApplication) => any): () => Promise<any> {
    return async () => {
        const app = await bootstrapTestApp(metadata);
        try {
            await test(app);
            await closeApp(app);
        } catch (e) {
            await closeApp(app);
            throw e;
        }
    };
}
