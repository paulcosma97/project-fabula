import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.FABULA_DB_HOST ?? 'localhost',
      port: process.env.FABULA_DB_PORT ? +process.env.FABULA_DB_PORT : 27017,
      database: process.env.FABULA_DB_NAME ?? 'fabuladb',
      username: process.env.FABULA_DB_USERNAME ?? 'fabulauser',
      password: process.env.FABULA_DB_PASSWORD ?? 'fabulapass',
      useUnifiedTopology: true
    }),
    SharedModule,
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
