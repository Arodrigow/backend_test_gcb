import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorRepository } from './repositories/implementations/DoctorRepository';
import { CorreiosApi } from 'src/shared/externalApi/correiosAPI';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository])],
  controllers: [DoctorController],
  providers: [DoctorService, CorreiosApi]
})
export class DoctorModule { }
