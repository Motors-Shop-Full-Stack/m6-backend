import { MigrationInterface, QueryRunner } from "typeorm";

export class createAnnouncement1667497589598 implements MigrationInterface {
    name = 'createAnnouncement1667497589598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "announcement_type" character varying NOT NULL, "description" character varying NOT NULL, "km" integer NOT NULL, "price" numeric(8,2) NOT NULL, "announcement_cover" character varying(50) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "category" character varying NOT NULL, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "announcement"`);
    }

}
