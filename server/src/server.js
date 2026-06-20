import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from './config/db.js';
import { initDB } from './config/initDB.js';
import authRouter from './routes/auth.js';
import usersRouter from './users.js';

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get('*', (req, res) => {
        res.sendFile(path.join(publicDir, 'index.html'));
    });
}

async function startApp() {
    try {
        await pool.query('SELECT 1');
        console.log("DB connected");
        await initDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(`Request has error ${e}`);
    }
}

startApp();