import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsBetweenArticleAndUser1686328002909 implements MigrationInterface {
    name = 'AddRelationsBetweenArticleAndUser1686328002909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "taglist" TO "tagList"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagList" TO "taglist"`);
    }

}
