import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1688635685723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/* sql */ `
        CREATE TABLE tenant(
            uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name text not null
        );
        
        CREATE TABLE invoice(
            uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id uuid NOT NULL,
            created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
            data jsonb NOT NULL  DEFAULT '{}'::jsonb,
            CONSTRAINT fk_invoice_ref_tenant
                FOREIGN KEY (tenant_id) REFERENCES tenant(uuid) ON DELETE CASCADE
        );

        CREATE TABLE invoice_recognition(
            uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            invoice_id uuid NOT NULL,
            created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
            finished_at timestamp without time zone DEFAULT NULL,
            recognizer text not null DEFAULT 'unknown',
            status  text not null DEFAULT 'created',
            data jsonb NOT NULL DEFAULT '{}'::jsonb,
            CONSTRAINT fk_invoice_recognition_ref_invoice
                FOREIGN KEY (invoice_id) REFERENCES invoice(uuid) ON DELETE CASCADE
        );


        CREATE TABLE file(
            uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id uuid NOT NULL,
            invoice_id uuid,
            created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
            mime text not null,
            filename text not null,
            body bytea not null,
            CONSTRAINT fk_file_ref_tenant 
                FOREIGN KEY (tenant_id) REFERENCES tenant(uuid) ON DELETE CASCADE,
            CONSTRAINT fk_file_ref_invoice 
                FOREIGN KEY(invoice_id) REFERENCES invoice(uuid) ON DELETE CASCADE
        );

        CREATE TABLE tag(
            uuid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id uuid NOT NULL,
            title text NOT NULL,
            color text,
            CONSTRAINT  fk_tag_ref_tenant
                FOREIGN KEY (tenant_id) REFERENCES tenant(uuid) ON DELETE CASCADE
        );

        CREATE TABLE link_tag_to_invoice(
            id bigserial PRIMARY KEY,
            tag_id uuid NOT NULL,
            invoice_id uuid NOT NULL,
            CONSTRAINT fk_tag_invoice_jt_ref_tag
                FOREIGN KEY (tag_id) REFERENCES tag(uuid) ON DELETE CASCADE,
            CONSTRAINT fk_tag_invoice_jt_ref_invoice
                FOREIGN KEY (invoice_id) REFERENCES invoice(uuid) ON DELETE CASCADE
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(/* sql */ `
        DROP TABLE link_tag_to_invoice;
        DROP TABLE tag;
        DROP TABLE file;
        DROP TABLE invoice_recognition;
        DROP TABLE invoice;
        DROP TABLE tenant;
    
    `)
  }
}
