import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUsers1685210605413 implements MigrationInterface {
    name = 'AddUsernameToUsers1685210605413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
