import { ViewSpecialtyDto } from "../dto/view-specialty.dto";
import { Specialty } from "../entities/specialty.entity";


export class ToViewSpecialtyMapper {
    static toDto(specialties: Specialty[]): ViewSpecialtyDto[] {
        const dto: ViewSpecialtyDto[] = [];

        specialties.forEach(specialty => dto.push({ name: specialty.name }));

        return dto;
    }
}