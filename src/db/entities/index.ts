import "reflect-metadata"
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm"

@Entity({ name: "tenant" })
export class TenantModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string

  @Column()
  name!: string
}

@Entity({ name: "invoice" })
export class InvoiceModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string

  @Column()
  tenant_id!: string

  @Column({ type: "timestamp without time zone", default: "now()" })
  created_at!: Date

  @Column({ type: "jsonb", default: "{}" })
  data!: object

  // relations

  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id", referencedColumnName: "uuid" })
  tenant!: Relation<TenantModel>

  @ManyToMany(() => TagModel)
  @JoinTable({
    name: "link_tag_to_invoice",
    joinColumn: {
      name: "invoice_id",
      referencedColumnName: "uuid",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "uuid",
    },
  })
  tags!: Relation<TagModel[]>
}

@Entity({ name: "invoice_recognition" })
export class InvoiceRecognitionModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string

  @Column()
  invoice_id!: string

  @Column({ type: "timestamp without time zone", default: "now()" })
  created_at!: Date

  @Column({ type: "timestamp without time zone", nullable: true })
  finished_at!: Date | null

  @Column({ default: "unknown" })
  recognizer!: string

  @Column({ default: "created" })
  status!: string

  @Column({ type: "jsonb", default: "{}" })
  data!: object

  // relations

  @ManyToOne(() => InvoiceModel)
  @JoinColumn({ name: "invoice_id", referencedColumnName: "uuid" })
  invoice!: Relation<InvoiceModel>
}

@Entity({ name: "file" })
export class FileModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string

  @Column()
  tenant_id!: string

  @Column({ nullable: true })
  invoice_id!: string | null

  @Column({ type: "timestamp without time zone", default: "now()" })
  created_at!: Date

  @Column()
  mime!: string

  @Column()
  filename!: string

  @Column("bytea")
  body!: Buffer

  // relations

  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: "tenant_id", referencedColumnName: "uuid" })
  tenant!: Relation<TenantModel>

  @ManyToOne(() => InvoiceModel)
  @JoinColumn({ name: "invoice_id", referencedColumnName: "uuid" })
  invoice!: Relation<InvoiceModel>
}

@Entity({ name: "tag" })
export class TagModel {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string

  @Column()
  tenant_id!: string

  @Column()
  title!: string

  @Column({ nullable: true })
  color!: string
}
