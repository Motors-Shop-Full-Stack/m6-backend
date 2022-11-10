import { MigrationInterface, QueryRunner } from "typeorm";

export class fixYear1667522666690 implements MigrationInterface {
    name = 'fixYear1667522666690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "year" TO "fabrication_year"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "fabrication_year" TO "year"`);
    }

}
