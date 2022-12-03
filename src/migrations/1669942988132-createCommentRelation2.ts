import { MigrationInterface, QueryRunner } from "typeorm";

export class createCommentRelation21669942988132 implements MigrationInterface {
    name = 'createCommentRelation21669942988132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "announcementId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_68af9910d29a58bf047f82c4c7a" FOREIGN KEY ("announcementId") REFERENCES "announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_68af9910d29a58bf047f82c4c7a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "announcementId"`);
    }

}
