import knex from "knex";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

// Use SSL cert from Fly.io secrets, fallback to local file for dev
const sslCert = process.env.SUPABASE_CA || fs.readFileSync(path.join(__dirname, "../certs/global-bundle.pem"), "utf-8");

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