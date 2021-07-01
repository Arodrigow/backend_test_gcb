import { Injectable } from "@nestjs/common";
import { CorreiosApi } from "src/shared/externalApi/correiosAPI"
import { CreateDoctorDto } from "src/modules/doctor/dto/create-doctor.dto";
import { UpdateDoctorDto } from "src/modules/doctor/dto/update-doctor.dto";
import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { EntityRepository, Repository } from "typeorm";
import { IDoctorRepository } from "../IDoctorRepository";

@Injectable()
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> implements IDoctorRepository {
    correiosApi: CorreiosApi = new CorreiosApi();

    async createDoctor(data: CreateDoctorDto): Promise<Doctor> {
        const end = await this.correiosApi.findAddress(data.cep);

        Object.assign(data, end);

        const doctorCreated = this.create(data);
        return await this.save(doctorCreated);

    }

    async findDoctorById(id: string): Promise<Doctor> {
        return await this.findOne(id, { relations: ["specialties"] });
    }

    async updateDoctor(id: string, data: UpdateDoctorDto): Promise<Doctor> {
        const doctorExist = await this.findOne(id);
        const doctorUpdated = this.merge(doctorExist, data);

        return await this.save(doctorUpdated);
    }
    async deleteDoctor(id: string): Promise<void> {
        await this.softDelete(id);
    }
    async recoverDoctor(id: string) {
        return await this.restore(id);
    }
}