import pool from './db.js';

export async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'unverified' CHECK (status IN ('unverified', 'active', 'blocked')),
        previous_status VARCHAR(20),
        verification_token VARCHAR(255),
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Table users ready');
}
