//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from "@nestjs/swagger"
import { SaveDoctorDto } from './save-doctor.dto';

export class UpdateDoctorDto extends PartialType(SaveDoctorDto) { }
