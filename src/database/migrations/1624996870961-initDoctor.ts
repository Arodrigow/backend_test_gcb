import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DoctorInit1624989539133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "doctors",
            columns: [{
                name: "id",
                type: "uuid",
                isPrimary: true
            }, {
                name: "name",
                type: "varchar"
            }, {
                name: "crm",
                type: "varchar"
            }, {
                name: "landline_phone",
                type: "varchar"
            }, {
                name: "mobile_phone",
                type: "varchar"
            }, {
                name: "cep",
                type: "varchar"
            }, {
                name: "end",
                type: "varchar"
            }, {
                name: "bairro",
                type: "varchar"
            }, {
                name: "cidade",
                type: "varchar"
            }, {
                name: "uf",
                type: "varchar"
            }, {

                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }, {

                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
            }, {
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("doctors");
    }

}