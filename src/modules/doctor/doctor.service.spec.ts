import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CorreiosAPIException } from "src/shared/errors/CorreiosAPIException";
import { DoctorAlreadyExistsException } from "src/shared/errors/DoctorAlreadyExistsException";
import { DoctorDoesNotExistException } from "src/shared/errors/DoctorDoesNotExistException";
import { SpecialtyAlreadyExistsException } from "src/shared/errors/SpecialtyAlreadyExistsException";
import { SpecialtyDoesNotExistException } from "src/shared/errors/SpecialtyDoesNotExistException";
import { SpecialtiesRepository } from "../specialties/repositories/implementations/SpecialtiesRepository";
import { DoctorService } from "./doctor.service";
import { SaveDoctorDto } from "./dto/save-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ViewDoctorDto } from "./dto/view-doctor.dto";
import { DoctorRepository } from "./repositories/implementations/DoctorRepository";


describe('DoctorService', () => {
  let doctorService: DoctorService;

  const doctor: SaveDoctorDto = {
    name: "mock",
    crm: "0234537",
    cep: "39800202",
    landline_phone: "1111111",
    mobile_phone: "2222222",
    specialties: ["Alergologia", "Angiologia"]
  }
  const doctorWrongCEP: SaveDoctorDto = {
    name: "mock",
    crm: "0234537",
    cep: "302032103012031023",
    landline_phone: "1111111",
    mobile_phone: "2222222",
    specialties: ["Alergologia", "Angiologia"]
  }
  const doctorWrongSpec: SaveDoctorDto = {
    name: "mock",
    crm: "0234537",
    cep: "39800202",
    landline_phone: "1111111",
    mobile_phone: "2222222",
    specialties: ["WRONG", "SPEC"]
  }
  const doctorSearch1: SaveDoctorDto = {
    name: "A",
    crm: "111111",
    cep: "39800202",
    landline_phone: "1111111",
    mobile_phone: "111111",
    specialties: ["Alergologia", "Angiologia"]
  }
  const doctorSearch2: SaveDoctorDto = {
    name: "B",
    crm: "22222",
    cep: "39800202",
    landline_phone: "2222",
    mobile_phone: "22222",
    specialties: ["Cirurgia cabeça e pescoço", "Cirurgia de tórax"]
  }
  const doctorSearch3: SaveDoctorDto = {
    name: "a B",
    crm: "21222",
    cep: "39800202",
    landline_phone: "22221",
    mobile_phone: "222221",
    specialties: ["Alergologia", "Cardiologia infantil"]
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
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
      providers: [DoctorService]
    }).compile();

    doctorService = await moduleRef.resolve(DoctorService);
  });

  afterEach(async () => {
    await doctorService.deleteAll();
  })

  describe("Create", () => {
    it("should be able to create a new doctor", async () => {
      const result: ViewDoctorDto = {
        name: "mock",
        crm: "0234537",
        landline_phone: "1111111",
        mobile_phone: "2222222",
        cep: "39800202",
        end: "Rua João Gentilini Fasciani",
        bairro: "Fátima",
        cidade: "Teófilo Otoni",
        uf: "MG",
        specialties: [
          {
            name: "Alergologia"
          },
          {
            name: "Angiologia"
          }
        ]
      }
      expect(await doctorService.create(doctor)).toStrictEqual(result);
    }), 20000;

    it("should not be able to create a doctor with same CRM", async () => {
      await doctorService.create(doctor);

      await expect(doctorService.create(doctor)).rejects.toEqual(new DoctorAlreadyExistsException())
    });
    it("should not be able to create a doctor with invalid CEP", async () => {

      await expect(doctorService.create(doctorWrongCEP)).rejects.toEqual(new CorreiosAPIException())
    }), 20000;
    it("should not be able to create a doctor with invalid specialty", async () => {

      await expect(doctorService.create(doctorWrongSpec)).rejects.toEqual(new SpecialtyAlreadyExistsException())
    });
  });

  describe("Update", () => {
    it("should be able to update a doctor", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      const update: UpdateDoctorDto = {
        name: "Update Test",
      }

      const result: ViewDoctorDto = {
        name: "Update Test",
        crm: "0234537",
        landline_phone: "1111111",
        mobile_phone: "2222222",
        cep: "39800202",
        end: "Rua João Gentilini Fasciani",
        bairro: "Fátima",
        cidade: "Teófilo Otoni",
        uf: "MG",
        specialties: [
          {
            name: "Alergologia"
          },
          {
            name: "Angiologia"
          }
        ]
      }
      expect((await doctorService.update(id, update)).name).toStrictEqual(result.name);
    }), 20000;
    it("should be able to correctly update a cep given a doctor", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      const update: UpdateDoctorDto = {
        cep: "39800052",
      }

      const result: ViewDoctorDto = {
        name: "mock",
        crm: "0234537",
        landline_phone: "1111111",
        mobile_phone: "2222222",
        cep: "39800052",
        end: "Rua Padre Eustáquio",
        bairro: "Tabajaras",
        cidade: "Teófilo Otoni",
        uf: "MG",
        specialties: [
          {
            name: "Angiologia"
          },
          {
            name: "Alergologia"
          }
        ]
      }
      const updatedDoctor = await doctorService.update(id, update)
      expect(updatedDoctor.cep).toStrictEqual(result.cep);
      expect(updatedDoctor.end).toStrictEqual(result.end);
      expect(updatedDoctor.bairro).toStrictEqual(result.bairro);
      expect(updatedDoctor.cidade).toStrictEqual(result.cidade);
      expect(updatedDoctor.uf).toStrictEqual(result.uf);
    }, 20000);

    it("should not be able to update a doctor with an invalid CEP", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      const update: UpdateDoctorDto = {
        cep: "38219738129378129",
      }

      await expect(doctorService.update(id, update)).rejects.toEqual(new CorreiosAPIException())
    });
    it("should not be able to update a doctor with an invalid specialty", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      const update: UpdateDoctorDto = {
        specialties: [
          "Non-existent"
        ]
      }
      await expect(doctorService.update(id, update)).rejects.toEqual(new SpecialtyDoesNotExistException())
    });
    it("should not be able to update a non-existent doctor", async () => {
      await doctorService.create(doctor);

      const id = "Non-existent ID"

      const update: UpdateDoctorDto = {
        name: "ID non-existent",
      }
      await expect(doctorService.update(id, update)).rejects.toEqual(new DoctorDoesNotExistException())
    });
  });

  describe("Find One", () => {
    it("should be able to find a doctor", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      const result: ViewDoctorDto = {
        name: "mock",
        crm: "0234537",
        landline_phone: "1111111",
        mobile_phone: "2222222",
        cep: "39800202",
        end: "Rua João Gentilini Fasciani",
        bairro: "Fátima",
        cidade: "Teófilo Otoni",
        uf: "MG",
        specialties: [
          {
            name: "Alergologia"
          },
          {
            name: "Angiologia"
          }
        ]
      }
      expect((await doctorService.findOne(id))).toStrictEqual(result);
    }), 20000;

    it("should not be able to find a non-existent doctor", async () => {
      await doctorService.create(doctor);

      const id = "Non-existent ID"

      await expect(doctorService.findOne(id)).rejects.toEqual(new DoctorDoesNotExistException())
    });
  });

  describe("Soft remove", () => {
    it("should be able to soft delete a doctor", async () => {
      await doctorService.create(doctor);

      const { id } = await doctorService.findByCrm(doctor.crm);

      expect(doctorService.remove(id)).resolves.not.toThrow();
    }), 20000;

    it("should not be able to soft delete a non-existent doctor", async () => {
      await doctorService.create(doctor);

      const id = "Non-existent ID"

      await expect(doctorService.remove(id)).rejects.toEqual(new DoctorDoesNotExistException())
    });
  });

  describe("Recover", () => {
    it("should be able to recover a deleted doctor", async () => {
      await doctorService.create(doctor);
      const { id } = await doctorService.findByCrm(doctor.crm);
      await doctorService.remove(id);

      expect(doctorService.recover(id)).resolves.not.toThrow();
    }), 20000;

    it("should not be able to recover a non-existent doctor", async () => {
      const id = "Non-existent ID"

      await expect(doctorService.recover(id)).rejects.toEqual(new DoctorDoesNotExistException())
    });
  });

  describe("Search", () => {
    it("should be able to recover a search for a doctor with any field", async () => {
      const result1 = await doctorService.create(doctorSearch1);
      const result2 = await doctorService.create(doctorSearch2);
      const result3 = await doctorService.create(doctorSearch3);


      expect(await doctorService.search({ name: "Z" })).toStrictEqual([]);
      expect(await doctorService.search({ name: "a" })).toEqual([result1, result3]);
      expect(await doctorService.search({ name: "b" })).toEqual([result2, result3]);
      expect(await doctorService.search({ crm: "1111" })).toEqual([result1]);
      expect(await doctorService.search({ crm: "222" })).toEqual([result2, result3]);
      expect(await doctorService.search({ crm: "12" })).toEqual([result3]);
      expect(await doctorService.search({ cep: "39800202" })).toEqual([result1, result2, result3]);
      expect(await doctorService.search({ end: "João" })).toEqual([result1, result2, result3]);
      expect(await doctorService.search({ end: "m" })).toEqual([]);
      expect(await doctorService.search({ specialty: "A" })).toEqual([result1, result2, result3]);
      expect(await doctorService.search({ specialty: "Alergologia" })).toEqual([result1, result3]);
      expect(await doctorService.search({ specialty: "TóRaX" })).toEqual([result2]);

    }), 200000;
  });
})//fim