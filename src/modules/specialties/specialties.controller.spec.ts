import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { SpecialtiesRepository } from "./repositories/implementations/SpecialtiesRepository";
import { SpecialtiesController } from "./specialties.controller";
import { SpecialtiesService } from "./specialties.service";

describe("Doctor Controller", () => {
    let app: INestApplication;
    let service: SpecialtiesService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule(
            {
                imports: [TypeOrmModule.forFeature([SpecialtiesRepository]),
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
                controllers: [SpecialtiesController],
                providers: [SpecialtiesService]
            })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();

        service = await moduleRef.resolve(SpecialtiesService);
    });

    afterEach(async () => {
        await service.removeByName("mock specialty");
    });


    afterAll(async () => {
        await app.close();
    });

    describe("/POST, Create Specialty", () => {
        it("should be able to create a specialty", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            return await request(app.getHttpServer())
                .post("/specialties")
                .send(mockSpecialty)
                .expect(201)
        });

        it("should not be able to create a specialty twice", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            await service.create(mockSpecialty)
            return await request(app.getHttpServer())
                .post("/specialties")
                .send(mockSpecialty)
                .expect(400)
        });
    })

    describe("/GET, Find all specialties", () => {
        it("should be able to list all specialties", async () => {

            return await request(app.getHttpServer())
                .get("/specialties")
                .expect(200)
        })
    })

    describe("/DELETE, Delete a specialty", () => {
        it("should be to delete a specialty", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            const result = await service.create(mockSpecialty);

            return await request(app.getHttpServer())
                .delete(`/specialties/${result.id}`)
                .expect(200)
        })
        it("should not be to delete a specialty using an invalid ID", async () => {
            return await request(app.getHttpServer())
                .delete(`/specialties/INVALIDID`)
                .expect(404)
        })
    })
});