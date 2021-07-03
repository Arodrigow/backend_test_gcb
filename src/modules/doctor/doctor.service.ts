import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from '../specialties/entities/specialty.entity';
import { SpecialtiesRepository } from '../specialties/repositories/implementations/SpecialtiesRepository';
import { ISpecialtiesRepository } from '../specialties/repositories/ISpecialtiesRepository';
import { SaveDoctorDto } from './dto/save-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ViewDoctorDto } from './dto/view-doctor.dto';
import { IDoctorRepository } from './repositories/IDoctorRepository';
import { DoctorRepository } from './repositories/implementations/DoctorRepository';
import { toCreateDoctorDtoMap } from './mapper/toCreateDoctorMap';
import { toViewDoctorDtoMap } from './mapper/toViewDoctorDtoMap';
import { toUpdateDoctorDtoMap } from './mapper/toUpdateDoctorMap';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(DoctorRepository)
    private doctorRepository: IDoctorRepository,
    @InjectRepository(SpecialtiesRepository)
    private specialtiesRepository: ISpecialtiesRepository) { }

  async create(saveDoctorDto: SaveDoctorDto): Promise<ViewDoctorDto> {

    const specialties: Specialty[] = [];

    saveDoctorDto.specialties.forEach(async specialty =>
      specialties.push(await this.specialtiesRepository.findByName(specialty)))

    const createDoctorDto = toCreateDoctorDtoMap.toDto(saveDoctorDto, specialties);

    return toViewDoctorDtoMap.toDto(await this.doctorRepository.createDoctor(createDoctorDto));
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<ViewDoctorDto> {
    const specialties: Specialty[] = [];

    updateDoctorDto.specialties.forEach(async specialty =>
      specialties.push(await this.specialtiesRepository.findByName(specialty)))
    const updaterDto = toUpdateDoctorDtoMap.toDto(updateDoctorDto, specialties);

    return toViewDoctorDtoMap.toDto(await this.doctorRepository.updateDoctor(id, updaterDto));

  }

  async findOne(id: string): Promise<ViewDoctorDto> {
    return toViewDoctorDtoMap.toDto(await this.doctorRepository.findDoctorById(id));
  }

  async remove(id: string): Promise<void> {
    await this.doctorRepository.deleteDoctor(id);
  }

  async recover(id: string): Promise<void> {
    await this.doctorRepository.recoverDoctor(id);
  }
}
