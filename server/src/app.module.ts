import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import configuration from './shared/config/config-loader';
import { DatabaseConfiguration } from './shared/types/config.types';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const db = configService.get<DatabaseConfiguration>('database');

                return {
                    type: 'mongodb',
                    useUnifiedTopology: true,
                    host: db.host,
                    port: db.port,
                    database: db.name,
                    username: db.user,
                    password: db.password,
                };
            },
        }),
        SharedModule,
        CoreModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
