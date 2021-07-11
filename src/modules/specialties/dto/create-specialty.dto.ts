import { ApiProperty } from "@nestjs/swagger";
export class CreateSpecialtyDto {
    @ApiProperty()
    name: string;
}
