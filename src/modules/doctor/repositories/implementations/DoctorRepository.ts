import { Injectable } from "@nestjs/common";
import { CorreiosApi } from "src/shared/externalApi/correiosAPI";
import { Doctor } from "../../entities/doctor.entity";
import { EntityRepository, ILike, Repository } from "typeorm";
import { IDoctorRepository } from "../IDoctorRepository";
import { DoctorAlreadyExistsException } from "src/shared/errors/DoctorAlreadyExistsException";
import { DoctorDoesNotExistException } from "src/shared/errors/DoctorDoesNotExistException";

import { CreateDoctorDto } from "../../dto/create-doctor.dto";
import { CreateUpdateDoctorDto } from "../../dto/create-update-doctor.dto";
import { CorreiosAPIException } from "src/shared/errors/CorreiosAPIException";
import { SpecialtyAlreadyExistsException } from "src/shared/errors/SpecialtyAlreadyExistsException";
import { SpecialtyDoesNotExistException } from "src/shared/errors/SpecialtyDoesNotExistException";

@Injectable()
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> implements IDoctorRepository {

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctorExists = await this.findDoctorByCrm(createDoctorDto.crm);
        let end;
        if (doctorExists) {
            throw new DoctorAlreadyExistsException();
        }
        try {
            end = await CorreiosApi.findAddress(createDoctorDto.cep);
        } catch (e) {
            throw new CorreiosAPIException();
        }

        Object.assign(createDoctorDto, end);

        try {
            const doctorCreated = this.create(createDoctorDto);
            return await this.save(doctorCreated);
        } catch {
            throw new SpecialtyAlreadyExistsException();
        }

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
            try {
                const end = await CorreiosApi.findAddress(data.cep);
                Object.assign(data, end);
            } catch (e) {
                throw new CorreiosAPIException();
            }
        }

        const doctorExist = await this.findDoctorById(id);
        if (!doctorExist) {
            throw new DoctorDoesNotExistException();
        }

        this.merge(doctorExist, data);
        try {
            return await this.save(doctorExist);
        } catch (e) {
            throw new SpecialtyDoesNotExistException();
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
    async deleteAll() {
        await this.query("TRUNCATE doctors CASCADE");
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
        uf,
        specialty
    }): Promise<Doctor[]> {
        if (name) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    name: ILike("%" + name + "%")
                }
            })
        }

        if (crm) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    crm: ILike("%" + crm + "%")
                }
            })
        }
        if (landline_phone) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    landline_phone: ILike("%" + landline_phone + "%")
                }
            })
        }
        if (mobile_phone) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    mobile_phone: ILike("%" + mobile_phone + "%")
                }
            })
        }
        if (cep) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    cep: ILike("%" + cep + "%")
                }
            })
        }

        if (end) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    end: ILike("%" + end + "%")
                }
            })
        }

        if (bairro) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    bairro: ILike("%" + bairro + "%")
                }
            })
        }

        if (cidade) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    cidade: ILike("%" + cidade + "%")
                }
            })
        }

        if (uf) {
            return await this.find({
                relations: ["specialties"],
                loadRelationIds: false,
                where: {
                    uf: ILike("%" + uf + "%")
                }
            })
        }

        if (specialty) {
            const doctors: Doctor[] = []
            const doctorsQ = await this.createQueryBuilder("doctors")
                .innerJoinAndSelect("doctors.specialties", "specialty")
                .where("specialty.name ILIKE :name", { name: `%${specialty}%` })
                .getMany()

            for (const x in doctorsQ) {
                doctors.push(await this.findDoctorById(doctorsQ[x].id))
            }

            return doctors
        }
    }
}