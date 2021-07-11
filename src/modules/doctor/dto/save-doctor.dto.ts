import { ApiProperty } from "@nestjs/swagger";

export class SaveDoctorDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    crm: string;

    @ApiProperty()
    landline_phone: string;

    @ApiProperty()
    mobile_phone: string;

    @ApiProperty()
    cep: string;

    @ApiProperty()
    specialties: string[];
}
