import { Injectable } from "@nestjs/common";
import { CorreiosApi } from "src/shared/externalApi/correiosAPI";
import { Doctor } from "src/modules/doctor/entities/doctor.entity";
import { EntityRepository, ILike, Repository } from "typeorm";
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

        if (data.cep) {
            const end = await CorreiosApi.findAddress(data.cep);
            Object.assign(data, end);
        }

        const doctorExist = await this.findDoctorById(id);
        if (!doctorExist) {
            throw new DoctorDoesNotExistException();
        }

        this.merge(doctorExist, data);

        return await this.save(doctorExist);

    }
    async deleteDoctor(id: string): Promise<void> {
        await this.findDoctorById(id);

        await this.softDelete(id);
    }
    async recoverDoctor(id: string) {
        await this.findDoctorById(id);

        return await this.restore(id);
    }

    async searchDoctor({
        name,
        crm,
        landline_phone,
        mobile_phone,
        cep,
        end,
        bairro,
        cidade,
        uf
    }): Promise<Doctor[]> {
        if (name) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    name: ILike(name)
                }
            })
        }

        if (crm) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    crm: ILike(crm)
                }
            })
        }
        if (landline_phone) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    landline_phone: ILike(landline_phone)
                }
            })
        }
        if (mobile_phone) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    mobile_phone: ILike(mobile_phone)
                }
            })
        }
        if (cep) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    cep: ILike(cep)
                }
            })
        }

        if (end) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    end: ILike(end)
                }
            })
        }

        if (bairro) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    bairro: ILike(bairro)
                }
            })
        }

        if (cidade) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    cidade: ILike(cidade)
                }
            })
        }

        if (uf) {
            return this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    uf: ILike(uf)
                }
            })
        }
    }
}