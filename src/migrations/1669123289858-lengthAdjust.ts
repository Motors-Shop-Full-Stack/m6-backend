import { MigrationInterface, QueryRunner } from "typeorm";

export class lengthAdjust1669123289858 implements MigrationInterface {
    name = 'lengthAdjust1669123289858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c370786a9bec317aff97065803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cel"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cel" character varying(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c370786a9bec317aff97065803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cel"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cel" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel")`);
    }

}
