import { ToViewSpecialtyMapper } from "src/modules/specialties/mapper/toViewSpecialtyMapper";
import { ViewDoctorDto } from "../dto/view-doctor.dto";
import { Doctor } from "../entities/doctor.entity";

export class toViewDoctorDtoMap {
    static toDto(doctor: Doctor): ViewDoctorDto {

        return {
            name: doctor.name,
            crm: doctor.crm,
            landline_phone: doctor.landline_phone,
            mobile_phone: doctor.mobile_phone,
            cep: doctor.cep,
            end: doctor.end,
            bairro: doctor.bairro,
            cidade: doctor.cidade,
            uf: doctor.uf,
            specialties: ToViewSpecialtyMapper.toDto(doctor.specialties),
        }
    }
}