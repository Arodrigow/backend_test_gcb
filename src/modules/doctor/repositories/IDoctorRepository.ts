import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { UpdateDoctorDto } from "../dto/update-doctor.dto";
import { Doctor } from "../entities/doctor.entity";

export interface IDoctorRepository {
    createDoctor(data: CreateDoctorDto): Promise<Doctor>;
    findDoctorById(id: string): Promise<Doctor>;
    findDoctorByCrm(id: string): Promise<Doctor>;
    updateDoctor(id: string, data: UpdateDoctorDto): Promise<Doctor>;
    deleteDoctor(id: string): Promise<void>;
    recoverDoctor(id: string);
}