import { Module } from '@nestjs/common';
import {SharedModule} from "../shared/shared.module";
import {ConfigModule} from "@nestjs/config";
import configuration from "../shared/config/config-loader";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), SharedModule],
    controllers: [],
    providers: [],
})
export class CoreModule {}
