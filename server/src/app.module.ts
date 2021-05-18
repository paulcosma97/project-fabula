import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_: ConfigService) => ({
        uri: 'mongodb://fabulauser:fabulapass@localhost:27017/fabuladb',
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
