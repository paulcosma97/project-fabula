import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import configuration from './shared/config/config-loader';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), SharedModule, CoreModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
