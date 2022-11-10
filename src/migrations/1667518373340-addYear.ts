import { MigrationInterface, QueryRunner } from "typeorm";

export class addYear1667518373340 implements MigrationInterface {
    name = 'addYear1667518373340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announcement_cover"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announcement_cover" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "announcement_cover"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "announcement_cover" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "year"`);
    }

}
