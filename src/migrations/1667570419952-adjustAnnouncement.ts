import { MigrationInterface, QueryRunner } from "typeorm";

export class adjustAnnouncement1667570419952 implements MigrationInterface {
    name = 'adjustAnnouncement1667570419952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announcement_type"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "fabrication_year"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announcement_cover"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announceType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announceCover" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "fabricationYear" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "fabricationYear"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announceCover"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announceType"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announcement_cover" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "fabrication_year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announcement_type" character varying NOT NULL`);
    }

}
