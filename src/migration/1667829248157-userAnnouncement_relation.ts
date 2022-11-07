import { MigrationInterface, QueryRunner } from "typeorm";

export class userAnnouncementRelation1667829248157 implements MigrationInterface {
    name = 'userAnnouncementRelation1667829248157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "FK_fd25dfe3da37df1715f11ba6ec8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "FK_fd25dfe3da37df1715f11ba6ec8"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "userId"`);
    }

}
