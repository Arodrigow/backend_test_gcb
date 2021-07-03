import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtiesRepository } from './repositories/implementations/SpecialtiesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtiesRepository])],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [TypeOrmModule]
})
export class SpecialtiesModule { }
