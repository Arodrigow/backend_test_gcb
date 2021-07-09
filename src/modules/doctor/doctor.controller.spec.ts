import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { DoctorService } from "./doctor.service";
import { SaveDoctorDto } from "./dto/save-doctor.dto";
import { SpecialtiesRepository } from "../specialties/repositories/implementations/SpecialtiesRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorRepository } from "./repositories/implementations/DoctorRepository";
import { DoctorController } from "./doctor.controller";
import { ConfigModule } from "@nestjs/config";


describe("Doctor Controller", () => {
    let service: DoctorService;
    let app: INestApplication;
    const doctor: SaveDoctorDto = {
        name: "mock",
        crm: "0234537",
        cep: "39800202",
        landline_phone: "1111111",
        mobile_phone: "2222222",
        specialties: ["Alergologia", "Angiologia"]
    }


    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule(
            {
                imports: [TypeOrmModule.forFeature([DoctorRepository]),
                TypeOrmModule.forFeature([SpecialtiesRepository]),
                ConfigModule.forRoot({ isGlobal: true }),
                TypeOrmModule.forRoot({
                    type: "postgres",
                    username: "postgres",
                    password: "docker",
                    url: process.env.DATABASE_URL,
                    autoLoadEntities: false,
                    synchronize: false,
                    database: "doctors_api",
                    migrationsRun: true,
                    migrations: [__dirname + "/../../database/migrations/*{.ts,.js}"],
                    cli: {
                        "migrationsDir": __dirname + "/../../database/migrations"
                    },
                    entities: [__dirname + "/../../modules/**/entities/*.entity{.ts,.js}"],
                }),],
                controllers: [DoctorController],
                providers: [DoctorService]
            })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();

        service = await moduleRef.resolve(DoctorService);
    });

    afterEach(async () => {
        await service.deleteAll();
    })

    afterAll(async () => {
        await app.close();
    });

    describe("/POST Create doctor", () => {
        it("should be able to create a doctor", async () => {
            return await request(app.getHttpServer())
                .post("/doctor")
                .send(doctor)
                .expect(201)

        });

        it("should not be able to create a doctor if crm already existis", async () => {
            await request(app.getHttpServer()).post("/doctor").send(doctor)
            return await request(app.getHttpServer()).post("/doctor").send(doctor).expect(400)
        });

    });

    describe("/GET Find One", () => {

        it("should be able to find a doctor", async () => {
            await service.create(doctor);
            const doc = await service.findByCrm(doctor.crm)
            return await request(app.getHttpServer())
                .get(`/doctor/${doc.id}`)
                .expect(200)

        })
        it("should not be able to find a doctor with a non-existent ID", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/NOTAVALIDID")
                .expect(404)

        })
    });

    describe("/GET search", () => {
        beforeAll(async () => { await service.create(doctor); })
        it("should be able to search by name", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query("name=mock")
                .expect(200)
        });

        it("should be able to search by crm", async () => {

            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`crm=${doctor.crm}`)
                .expect(200)
        });

        it("should be able to search by landline_phone", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`landline_phone=${doctor.landline_phone}`)
                .expect(200)
        });

        it("should be able to search by mobile_phone", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`mobile_phone=${doctor.mobile_phone}`)
                .expect(200)
        });

        it("should be able to search by cep", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`cep=${doctor.cep}`)
                .expect(200)
        });

        it("should be able to search by end", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`end=jo`)
                .expect(200)
        });

        it("should be able to search by bairro", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`bairro=fa`)
                .expect(200)
        });

        it("should be able to search by cidade", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`cidade=teo`)
                .expect(200)
        });

        it("should be able to search by uf", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`uf=mg`)
                .expect(200)
        });

        it("should be able to search by specialty", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`specialty=a`)
                .expect(200)
        });

        it("should not be able to search by a invalid query", async () => {
            return await request(app.getHttpServer())
                .get("/doctor/search/q")
                .query(`invalid_query=aaa`)
                .expect(500)
        });

    });

    describe("/PATCH update", () => {
        beforeAll(async () => { await service.create(doctor); })
        it("should be able to update a doctor", async () => {
            const doc = await service.findByCrm(doctor.crm)
            return await request(app.getHttpServer())
                .patch(`/doctor/${doc.id}`)
                .send({
                    name: "Test name update"
                })
                .expect(200)
        })
        it("should not be able to update a doctor using an invalid id", async () => {
            return await request(app.getHttpServer())
                .patch(`/doctor/NOTAVALIDID`)
                .send({
                    name: "Test name update"
                })
                .expect(404)
        })
    })

    describe("/DELETE SofDelete", () => {
        beforeAll(async () => { await service.create(doctor); })

        it("should be able to softdelete a doctor", async () => {
            const doc = await service.findByCrm(doctor.crm);
            return await request(app.getHttpServer())
                .delete(`/doctor/${doc.id}`)
                .expect(200)
        });
        it("should not be able to softdelete a doctor using an invalid ID ", async () => {
            return await request(app.getHttpServer())
                .delete(`/doctor/INVALIDID`)
                .expect(404)
        });
    });

    describe("/PATCH Recover", () => {
        beforeAll(async () => { await service.create(doctor); })

        it("should be able to recover a doctor", async () => {
            const doc = await service.findByCrm(doctor.crm);
            await service.remove(doc.id);

            return await request(app.getHttpServer())
                .patch(`/doctor/recover/${doc.id}`)
                .expect(200)
        });
        it("should not be able to recover a doctor using an invalid ID ", async () => {
            return await request(app.getHttpServer())
                .delete(`/doctor/recover/INVALIDID`)
                .expect(404)
        });
    });
})