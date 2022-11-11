import { MigrationInterface, QueryRunner } from "typeorm";

export class descriptionAndAccType1668122333208 implements MigrationInterface {
    name = 'descriptionAndAccType1668122333208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accountType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountType"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
