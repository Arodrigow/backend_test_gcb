import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DoctorModule } from './doctor/doctor.module';


@Module({
  imports: [DoctorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "docker",
      url: process.env.DATABASE_URL,
      autoLoadEntities: false,
      synchronize: false,
      entities: [__dirname + "/**/entities/*.entity{.ts,.js}"],
    })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
