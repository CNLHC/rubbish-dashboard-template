import path from "path"
import { DataSource } from "typeorm"

export const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  migrations: [path.join(__dirname, "migrations", "*.ts")],
  synchronize: false,
})
