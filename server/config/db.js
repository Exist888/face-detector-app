import knex from "knex";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const sslCertPath = path.join(process.cwd(), "config", "global-bundle.pem");
const sslCert = fs.readFileSync(sslCertPath, "utf-8");

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true,
            ca: sslCert
        }
    },
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 10000
    }
});

export default db;