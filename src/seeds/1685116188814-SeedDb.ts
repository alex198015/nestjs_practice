import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1685116188814 implements MigrationInterface {
    name = 'SeedDb1685116188814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "tags" (name) VALUES ('dragons'), ('coffee'), ('nestjs')`);

        // password is 123456
        await queryRunner.query(`INSERT INTO "user" (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$xMjI0HYKeQ8zFOwMXR.k1uTnWyEhdNbBnmzYDMzXghCMEvjjNVQ12')`);
        
        await queryRunner.query(`INSERT INTO "articles" (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'first article', 'first article description', 'first article body', 'coffee,dragons', 1)`);

        await queryRunner.query(`INSERT INTO "articles" (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'second article', 'second article description', 'second article body', 'coffee,dragons', 1)`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
