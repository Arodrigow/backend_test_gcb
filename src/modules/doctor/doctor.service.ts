import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity'
import { IDoctorRepository } from './repositories/IDoctorRepository';
import { DoctorRepository } from './repositories/implementations/DoctorRepository';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(DoctorRepository)
    private doctorRepository: IDoctorRepository) { }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorRepository.createDoctor(createDoctorDto);
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return await this.doctorRepository.updateDoctor(id, updateDoctorDto);
  }

  async findOne(id: string): Promise<Doctor> {
    return await this.doctorRepository.findDoctorById(id);
  }

  async remove(id: string): Promise<void> {
    await this.doctorRepository.deleteDoctor(id);
  }

  async recover(id: string): Promise<void> {
    await this.doctorRepository.recoverDoctor(id);
  }
}
