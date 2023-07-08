import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1688624143515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/*sql*/ `
      CREATE TABLE general_cache (
          id          bigserial PRIMARY KEY,
          cache_key   text NOT NULL,
          cache_value jsonb NOT NULL DEFAULT '{}'::jsonb,
          expires_at  timestamp with time zone NOT NULL DEFAULT now(),
          CONSTRAINT unique_cache_key UNIQUE (cache_key)
      );
      CREATE INDEX general_cache_cache_key_uindex ON general_cache (cache_key, expires_at);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/*sql*/ `
      DROP TABLE general_cache;
    `)
  }
}
