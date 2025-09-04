import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const base64Cert = process.env.SUPABASE_CA_BASE64;

if (!base64Cert) {
    throw new Error("SUPABASE_CA_BASE64 environment variable is not set");
}

// Decode the Base64 string back to original cert text
const sslCert = Buffer.from(base64Cert, "base64").toString("utf-8");

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