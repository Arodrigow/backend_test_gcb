import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitDoctorsSpecialties1625145409357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "doctors_specialties_specialties",
            columns: [{
                name: "doctorsId",
                type: "uuid",
                isPrimary: true
            }, {
                name: "specialtiesId",
                type: "uuid",
                isPrimary: true
            }],
            foreignKeys: [
                {
                    columnNames: ['doctorsId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'doctors',
                },
                {
                    columnNames: ['specialtiesId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'specialties',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctors_specialties_specialties");
    }

}
