import { Specialty } from "src/modules/specialties/entities/specialty.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecilatiesSeed1625579676421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(Specialty, {
            id: "1bd52e5f-ff60-4e36-898b-f82e0d276a4d",
            name: "Alergologia"
        })
        await queryRunner.manager.save(Specialty, {
            id: "4d06c6e7-b709-4c72-90fb-bcdeb5df3dae",
            name: "Angiologia"
        })
        await queryRunner.manager.save(Specialty, {
            id: "6f49a824-b331-4778-983d-93eebf0e7e67",
            name: "Buco maxilo"
        })
        await queryRunner.manager.save(Specialty, {
            id: "36d8994c-cb93-4901-9b28-4fa8117c3a4c",
            name: "Cardiologia clínica"
        })
        await queryRunner.manager.save(Specialty, {
            id: "c9842140-f34f-4124-8776-348baf7379eb",
            name: "Cardiologia infantil"
        })
        await queryRunner.manager.save(Specialty, {
            id: "2b72cb5f-0023-412c-ad1e-3c9112501f3f",
            name: "Cirurgia cabeça e pescoço"
        })
        await queryRunner.manager.save(Specialty, {
            id: "adf1f8ea-5109-4987-90d3-b29966f09dda",
            name: "Cirurgia cardíaca"
        })
        await queryRunner.manager.save(Specialty, {
            id: "7ad86a93-b153-4e5a-8e63-84126279c375",
            name: "Cirurgia de tórax"
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.query("DELETE FROM specialties")
    }
}

