import { Specialty } from "src/modules/specialties/entities/specialty.entity";

export class CreateDoctorDto {

    name: string;
    crm: string;
    landline_phone: string;
    mobile_phone: string;
    cep: string;
    end?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    specialties: Specialty[];
}
