import { PartialType } from '@nestjs/mapped-types';
import { SaveDoctorDto } from './save-doctor.dto';

export class UpdateDoctorDto extends PartialType(SaveDoctorDto) { }
