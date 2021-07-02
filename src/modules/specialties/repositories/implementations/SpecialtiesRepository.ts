import { Injectable } from "@nestjs/common";
import { CreateSpecialtyDto } from "src/modules/specialties/dto/create-specialty.dto";
import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { SpecialtyAlreadyExistsException } from "src/shared/errors/SpecialtyAlreadyExistsException";
import { EntityRepository, Repository } from "typeorm";
import { ISpecialtiesRepository } from "../ISpecialtiesRepository";

@Injectable()
@EntityRepository(Specialty)
export class SpecialtiesRepository extends Repository<Specialty> implements ISpecialtiesRepository {

    async createSpecialty(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
        const specialtyExists = await this.findByName(createSpecialtyDto.name);
        if (specialtyExists) {
            throw new SpecialtyAlreadyExistsException();
        }

        const specialty = this.create(createSpecialtyDto);
        return await this.save(specialty);
    }

    async findById(id: string): Promise<Specialty> {
        try {
            return await this.findOne(id);
        } catch (e) {
            throw new SpecialtyAlreadyExistsException();
        }
    }

    async findByName(name: string): Promise<Specialty> {
        return await this.findOne({ name });
    }

    async findAll(): Promise<Specialty[]> {
        return await this.find();
    }

    async deleteSpecialty(id: string): Promise<void> {
        await this.findById(id);
        await this.delete(id);
    }

}