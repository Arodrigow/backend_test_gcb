import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { SaveDoctorDto } from "../dto/save-doctor.dto";

export class toCreateDoctorDtoMap {

    static toDto(saveDto: SaveDoctorDto, specialties: Specialty[]): CreateDoctorDto {
        return {
            name: saveDto.name,
            crm: saveDto.crm,
            cep: saveDto.cep,
            landline_phone: saveDto.landline_phone,
            mobile_phone: saveDto.mobile_phone,
            specialties: specialties
        }

    }

}