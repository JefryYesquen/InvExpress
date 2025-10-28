import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

console.log("🔍 Variables .env cargadas:", process.env.DB_USER, process.env.DB_PASSWORD);
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});
