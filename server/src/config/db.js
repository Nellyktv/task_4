import pg from 'pg';

const { Pool } = pg;

const useSSL = process.env.DATABASE_URL?.includes('render.com');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
});

export default pool;