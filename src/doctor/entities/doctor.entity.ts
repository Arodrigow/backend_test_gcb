import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
