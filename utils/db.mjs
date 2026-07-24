import dotenv from "dotenv";

dotenv.config();

import pg from "pg";

const { Pool } = pg;

console.log("DB URL:", process.env.DATABASE_URL);

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default connectionPool;