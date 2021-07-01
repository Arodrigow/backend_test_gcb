import { Injectable } from "@nestjs/common";
import { CreateSpecialtyDto } from "src/modules/specialties/dto/create-specialty.dto";
import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { EntityRepository, Repository } from "typeorm";
import { ISpecialtiesRepository } from "../ISpecialtiesRepository";

@Injectable()
@EntityRepository(Specialty)
export class SpecialtiesRepository extends Repository<Specialty> implements ISpecialtiesRepository {

    async createSpecialty(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
        const specialty = this.create(createSpecialtyDto);
        return await this.save(specialty);
    }
    async deleteSpecialty(id: string): Promise<void> {
        await this.delete(id);
    }

}