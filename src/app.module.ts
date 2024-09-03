import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
//Entities
import { entities } from '../src/internship/domain/entities/_index';
//Controllers
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { controllers } from '../src/internship/infrastructure/controllers/_index';
//Providers
import { providers } from '../src/internship/infrastructure/repositories/_index';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        schema: config.get('DB_SCHEMA'),
        entities,
        synchronize: true, //Nota mental: usar "synchronize: true" solo en desarrollo, no en produccion
      }),
    }),
    TypeOrmModule.forFeature(entities),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ...controllers],
  providers: [...providers],
})
export class AppModule {}
