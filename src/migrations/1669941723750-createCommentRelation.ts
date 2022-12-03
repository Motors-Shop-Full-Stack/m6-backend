import { MigrationInterface, QueryRunner } from "typeorm";

export class createCommentRelation1669941723750 implements MigrationInterface {
    name = 'createCommentRelation1669941723750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_comments_comment" ("userId" uuid NOT NULL, "commentId" uuid NOT NULL, CONSTRAINT "PK_20cec8dce21b397550518aa746c" PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c6e76d049ed9560f4c08649b65" ON "user_comments_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e288a0c8c8963e1cb2614c731" ON "user_comments_comment" ("commentId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c370786a9bec317aff97065803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cel"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cel" character varying(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel")`);
        await queryRunner.query(`ALTER TABLE "user_comments_comment" ADD CONSTRAINT "FK_c6e76d049ed9560f4c08649b651" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_comments_comment" ADD CONSTRAINT "FK_2e288a0c8c8963e1cb2614c7319" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_comments_comment" DROP CONSTRAINT "FK_2e288a0c8c8963e1cb2614c7319"`);
        await queryRunner.query(`ALTER TABLE "user_comments_comment" DROP CONSTRAINT "FK_c6e76d049ed9560f4c08649b651"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c370786a9bec317aff97065803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cel"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cel" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c370786a9bec317aff97065803d" UNIQUE ("cel")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e288a0c8c8963e1cb2614c731"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6e76d049ed9560f4c08649b65"`);
        await queryRunner.query(`DROP TABLE "user_comments_comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
