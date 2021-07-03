import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { SaveDoctorDto } from "../dto/save-doctor.dto";

// @Injectable()
export class toCreateDoctorDtoMap {
    static toDto(saveDoctorDto: SaveDoctorDto, specialties: Specialty[]) {
        const createDoctorDto: CreateDoctorDto = {
            name: saveDoctorDto.name,
            crm: saveDoctorDto.crm,
            cep: saveDoctorDto.cep,
            landline_phone: saveDoctorDto.landline_phone,
            mobile_phone: saveDoctorDto.mobile_phone,
            specialties: specialties
        }
        return createDoctorDto;
    }
}