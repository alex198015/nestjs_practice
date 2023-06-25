import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesRelationsBetweenArticleAndUser1686578627936 implements MigrationInterface {
    name = 'AddFavoritesRelationsBetweenArticleAndUser1686578627936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorites_articles" ("userId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_2fa8a5bd94301a2985b59f5d397" PRIMARY KEY ("userId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_81b77658546f148f69db2e7a48" ON "user_favorites_articles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa78cf32d784957ec6ae8b1943" ON "user_favorites_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" ADD CONSTRAINT "FK_81b77658546f148f69db2e7a487" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" ADD CONSTRAINT "FK_aa78cf32d784957ec6ae8b19436" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" DROP CONSTRAINT "FK_aa78cf32d784957ec6ae8b19436"`);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" DROP CONSTRAINT "FK_81b77658546f148f69db2e7a487"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa78cf32d784957ec6ae8b1943"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81b77658546f148f69db2e7a48"`);
        await queryRunner.query(`DROP TABLE "user_favorites_articles"`);
    }

}
