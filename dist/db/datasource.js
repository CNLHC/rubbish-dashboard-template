"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var typeorm_1 = require("typeorm");
exports.db = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrationsTableName: "migrations",
    migrations: ["./migrations/*.ts"],
    synchronize: false,
});
