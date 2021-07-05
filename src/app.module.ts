import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DoctorModule } from './modules/doctor/doctor.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { ValidationYup } from './shared/middlewares/validationYup';


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
      database: "doctors_api",
      migrationsRun: true,
      migrations: [__dirname + "/database/migrations/*{.ts,.js}"],
      cli: {
        "migrationsDir": __dirname + "/database/migrations"
      },
      entities: [__dirname + "/modules/**/entities/*.entity{.ts,.js}"],
    }),
    SpecialtiesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationYup)
      .forRoutes(
        { path: 'doctor', method: RequestMethod.POST },
        { path: 'doctor/:id', method: RequestMethod.PATCH })
  }
}
