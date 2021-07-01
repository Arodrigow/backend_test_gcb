import { CreateSpecialtyDto } from "../dto/create-specialty.dto";
import { Specialty } from "../entities/specialty.entity";

export interface ISpecialtiesRepository {
    createSpecialty(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty>;
    deleteSpecialty(id: string): Promise<void>;
}