import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
