
import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { CreateUpdateDoctorDto } from "../dto/create-update-doctor.dto";
import { Doctor } from "../entities/doctor.entity";

export interface IDoctorRepository {
    createDoctor(data: CreateDoctorDto): Promise<Doctor>;
    deleteAll();
    findDoctorById(id: string): Promise<Doctor>;
    findDoctorByCrm(id: string): Promise<Doctor>;
    updateDoctor(id: string, data: CreateUpdateDoctorDto): Promise<Doctor>;
    deleteDoctor(id: string): Promise<void>;
    recoverDoctor(id: string);
    searchDoctor(params): Promise<Doctor[]>;
}