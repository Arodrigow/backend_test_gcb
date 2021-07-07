import { Doctor } from "../../doctor/entities/doctor.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity("specialties")
export class Specialty {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @ManyToMany(() => Doctor, doctor => doctor.specialties)
    doctors: Doctor[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
