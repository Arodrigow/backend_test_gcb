import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { CreateUpdateDoctorDto } from "../dto/create-update-doctor.dto";
import { UpdateDoctorDto } from "../dto/update-doctor.dto";

export class toUpdateDoctorDtoMap {

    static toDto(updateDto: UpdateDoctorDto, specialties: Specialty[]): CreateUpdateDoctorDto {
        return {
            name: updateDto.name,
            crm: updateDto.crm,
            cep: updateDto.cep,
            landline_phone: updateDto.landline_phone,
            mobile_phone: updateDto.mobile_phone,
            specialties: specialties
        }
    }

}