import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseConnection, DatabaseConnectionToken } from '../../src/shared/common/persistance/db.types';
import { performance } from 'perf_hooks';
import { Milliseconds } from '../../src/shared/types/base.types';

const DESIRED_FPS = 60;
const TRANSPORT_OVERHEAD: Milliseconds = 2;

async function bootstrapTestApp(metadata: ModuleMetadata): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule(metadata).compile();

    const app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    await app.init();
    return app;
}

async function closeApp(app: INestApplication): Promise<void> {
    const conn = app.get<DatabaseConnection>(DatabaseConnectionToken);
    await conn.close();
    await app.close();
}

export function usingApp(
    metadata: ModuleMetadata,
    test: (app: INestApplication, assertPerformance: <T>(fn: () => Promise<T>) => Promise<T>) => any,
): () => Promise<any> {
    return async () => {
        const app = await bootstrapTestApp(metadata);
        const testPerformance = async <T>(fn: () => Promise<T>): Promise<T> => {
            const start = performance.now();
            const res = await fn();
            const duration /* millis */ = performance.now() - start;

            Logger.log(`Function took ${Math.round(duration * 100) / 100}ms to complete.`, 'Performance');
            expect(duration).toBeLessThanOrEqual(
                (1000 / DESIRED_FPS - TRANSPORT_OVERHEAD) *
                    /* 25% error margin -- tests slow this down; in production we should expect about 30% performance improvements.  */ 1.25,
            );

            return res;
        };

        try {
            await test(app, testPerformance);
            await closeApp(app);
        } catch (e) {
            await closeApp(app);
            throw e;
        }
    };
}
