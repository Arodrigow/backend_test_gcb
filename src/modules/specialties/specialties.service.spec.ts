import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecialtyAlreadyExistsException } from "src/shared/errors/SpecialtyAlreadyExistsException";
import { SpecialtyDoesNotExistException } from "src/shared/errors/SpecialtyDoesNotExistException";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { SpecialtiesRepository } from "./repositories/implementations/SpecialtiesRepository";
import { SpecialtiesService } from "./specialties.service";

describe("Specialties Service", () => {
    let specialtiesService: SpecialtiesService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
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
            })],
            providers: [SpecialtiesService]
        }).compile();

        specialtiesService = await moduleRef.resolve(SpecialtiesService)
    });

    afterEach(async () => {
        await specialtiesService.removeByName("mock specialty");
    });

    describe("Create", () => {
        it("Should be able to create a specialty", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            const resp = await specialtiesService.create(mockSpecialty);
            expect(resp).toHaveProperty("id");
            expect(resp.name).toBe(mockSpecialty.name)
        });
        it("should not be able to create a specialy that already exists", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            await specialtiesService.create(mockSpecialty);
            await expect(specialtiesService.create(mockSpecialty)).rejects.toEqual(new SpecialtyAlreadyExistsException());
        });
    });

    describe("List All", () => {
        it("should be able to list all specialties", async () => {

            const list = [{
                "id": "1bd52e5f-ff60-4e36-898b-f82e0d276a4d",
                "name": "Alergologia"
            },
            {
                "id": "4d06c6e7-b709-4c72-90fb-bcdeb5df3dae",
                "name": "Angiologia"
            },
            {
                "id": "6f49a824-b331-4778-983d-93eebf0e7e67",
                "name": "Buco maxilo"
            },
            {
                "id": "36d8994c-cb93-4901-9b28-4fa8117c3a4c",
                "name": "Cardiologia clínica"
            },
            {
                "id": "c9842140-f34f-4124-8776-348baf7379eb",
                "name": "Cardiologia infantil"
            },
            {
                "id": "2b72cb5f-0023-412c-ad1e-3c9112501f3f",
                "name": "Cirurgia cabeça e pescoço"
            },
            {
                "id": "adf1f8ea-5109-4987-90d3-b29966f09dda",
                "name": "Cirurgia cardíaca"
            },
            {
                "id": "7ad86a93-b153-4e5a-8e63-84126279c375",
                "name": "Cirurgia de tórax"
            }]

            expect(await specialtiesService.findAll()).toEqual(list);
        });
    });

    describe("Delete", () => {
        it("should be able to delete a specialty", async () => {
            const mockSpecialty: CreateSpecialtyDto = {
                name: "mock specialty"
            }
            const spec = await specialtiesService.create(mockSpecialty)
            await expect(specialtiesService.remove(spec.id)).resolves.not.toThrow();
        })
        it("should not be able to delete a non-existent specialty", async () => {
            await expect(specialtiesService.remove("NOT A VALID ID")).rejects.toEqual(new SpecialtyDoesNotExistException())
        });
    });
});