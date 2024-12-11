import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
//Entities
import { entities } from './internship/domain/entities/_index';
//Controllers
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { controllers } from './internship/infrastructure/controllers/_index';
//Providers
import { providers } from './internship/infrastructure/repositories/_index';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities,
      }),
    }),
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature(entities),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ...controllers],
  providers: [...providers],
})
export class AppModule {}
