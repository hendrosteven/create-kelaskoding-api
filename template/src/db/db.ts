import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';

const connectionString = process.env.DATABASE_URL!;
const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString,
    ssl: isProd ? { rejectUnauthorized: false } : false,
    max: 10, //maximum number of clients in the pool
    idleTimeoutMillis: 30_000, //close idle clients after 30 seconds
    connectionTimeoutMillis: 10_000, //return an error after 10 seconds if connection could not be established
});

pool.on('connect', async (client) => {
    await client.query('SET TIME ZONE \'UTC\'');
});

export const db = drizzle(pool, { schema });