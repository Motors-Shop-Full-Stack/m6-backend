import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1667828983664 implements MigrationInterface {
    name = 'createUser1667828983664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "cpf" character varying(11) NOT NULL, "cel" character varying(11) NOT NULL, "birthdate" date NOT NULL, "cep" character varying(8) NOT NULL DEFAULT true, "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL DEFAULT true, "number" integer NOT NULL, "complement" character varying(20), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
