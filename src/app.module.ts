import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/entity/user.entity';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { HealthcheckService } from './healthcheck/healthcheck.service';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './user/users.service';
import { UserRepository } from './user/repository/user.repository';
import { UsersController } from './user/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRESS_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.POSTGRES_USER, 
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        entities: [UserEntity],  
        // synchronize: true,  //don't use in production (might llose data)
      })
    }),     
    HealthcheckModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, HealthcheckController, UsersController],
  providers: [AppService, HealthcheckService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
