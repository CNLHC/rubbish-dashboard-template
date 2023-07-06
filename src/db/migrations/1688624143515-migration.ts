import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1688624143515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/*sql*/ `
        SELECT 1
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/*sql*/ `
        SELECT 1
    `)
  }
}
