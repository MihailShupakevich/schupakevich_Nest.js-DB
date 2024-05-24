import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TodoModule } from './todo/todo.module';
import Todo from './todo/todo.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('POSTGRES_DIALECT'),
        host: configService.get(' POSTGRES_HOST'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: Number(configService.get('POSTGRES_PORT')),
        database: configService.get('POSTGRES_DB'),
        models: [Todo],
      }),
      inject: [ConfigService],
    }),
    TodoModule,
  ],
})
export class AppModule {}
