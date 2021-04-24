import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  Transport,
  // ClientsModule,
} from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: 'HELLO_WORLD_SERVICE',
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) =>
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: 'localhost', port: 8080 },
        }),
    },
  ],
})
export class AppModule {}
