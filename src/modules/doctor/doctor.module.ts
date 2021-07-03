import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorRepository } from './repositories/implementations/DoctorRepository';
import { SpecialtiesRepository } from '../specialties/repositories/implementations/SpecialtiesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository]), TypeOrmModule.forFeature([SpecialtiesRepository])],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule { }
