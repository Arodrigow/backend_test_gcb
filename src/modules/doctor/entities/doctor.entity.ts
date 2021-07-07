import { Specialty } from '../../specialties/entities/specialty.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    crm: string;

    @Column()
    landline_phone: string;

    @Column()
    mobile_phone: string;

    @Column()
    cep: string;

    @Column()
    end?: string;

    @Column()
    bairro?: string;

    @Column()
    cidade?: string;

    @Column()
    uf?: string;

    @ManyToMany(() => Specialty, specialty => specialty.doctors)
    @JoinTable()
    specialties: Specialty[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
