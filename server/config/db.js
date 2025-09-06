import knex from "knex";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const sslCertPath = path.join(__dirname, "supabase-ca.pem");

let sslCert;
try {
    sslCert = fs.readFileSync(sslCertPath, "utf8");
    console.log("✅ SSL cert loaded. First 10 characters:", sslCert.substring(0, 10));
} catch (error) {
    console.error(`❌ Failed to load SSL cert from ${sslCertPath}`, error);
    process.exit(1);
}

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