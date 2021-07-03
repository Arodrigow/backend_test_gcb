import { Injectable } from "@nestjs/common";
import { CorreiosApi } from "src/shared/externalApi/correiosAPI";
import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { EntityRepository, Repository } from "typeorm";
import { IDoctorRepository } from "../IDoctorRepository";
import { DoctorAlreadyExistsException } from "src/shared/errors/DoctorAlreadyExistsException";
import { DoctorDoesNotExistException } from "src/shared/errors/DoctorDoesNotExistException";

import { CreateDoctorDto } from "../../dto/create-doctor.dto";
import { CreateUpdateDoctorDto } from "../../dto/create-update-doctor.dto";

@Injectable()
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> implements IDoctorRepository {

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctorExists = await this.findDoctorByCrm(createDoctorDto.crm);
        if (doctorExists) {
            throw new DoctorAlreadyExistsException();
        }
        const end = await CorreiosApi.findAddress(createDoctorDto.cep);
        Object.assign(createDoctorDto, end);

        const doctorCreated = this.create(createDoctorDto);
        return await this.save(doctorCreated);

    }

    async findDoctorById(id: string): Promise<Doctor> {
        try {
            return await this.findOne(id, { relations: ["specialties"] });
        } catch (err) {
            throw new DoctorDoesNotExistException();
        }
    }

    async findDoctorByCrm(crm: string): Promise<Doctor> {
        return await this.findOne({ crm: crm });
    }

    async updateDoctor(id: string, data: CreateUpdateDoctorDto): Promise<Doctor> {

        try {
            const doctorExist = await this.findDoctorById(id);
            Object.assign(doctorExist, data)
            return await this.save(doctorExist);
        } catch (err) {
            throw new DoctorDoesNotExistException();
        }
    }
    async deleteDoctor(id: string): Promise<void> {
        await this.findDoctorById(id);

        await this.softDelete(id);
    }
    async recoverDoctor(id: string) {
        await this.findDoctorById(id);

        return await this.restore(id);
    }
}