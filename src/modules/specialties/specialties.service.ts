import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { SpecialtiesRepository } from './repositories/implementations/SpecialtiesRepository';
import { ISpecialtiesRepository } from './repositories/ISpecialtiesRepository';

@Injectable()
export class SpecialtiesService {

  constructor(@InjectRepository(SpecialtiesRepository)
  private specialtiesRepository: ISpecialtiesRepository) { }

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return await this.specialtiesRepository.createSpecialty(createSpecialtyDto);
  }

  async findAll() {
    return await this.specialtiesRepository.findAll();
  }

  async remove(id: string) {
    return await this.specialtiesRepository.deleteSpecialty(id);
  }


  async removeByName(name: string) {
    return await this.specialtiesRepository.deleteSpecialtyByName(name);
  }
}
