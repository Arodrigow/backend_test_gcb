import { ViewSpecialtyDto } from "src/modules/specialties/dto/view-specialty.dto";

export class ViewDoctorDto {

    name: string;
    crm: string;
    landline_phone: string;
    mobile_phone: string;
    cep: string;
    end: string;
    bairro: string;
    cidade: string;
    uf: string;
    specialties: ViewSpecialtyDto[];
}