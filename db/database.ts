import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS tickets (
      order_id VARCHAR(255) NOT NULL PRIMARY KEY,
      vat NUMERIC(4, 2) NOT NULL,
      total NUMERIC(10, 2) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      product_id VARCHAR(255) NOT NULL PRIMARY KEY,
      product_name VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );
  `);

  console.log('Database initialized');
}
