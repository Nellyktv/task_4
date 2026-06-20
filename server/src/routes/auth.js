import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name,email,password,status) VALUES ($1,$2,$3,$4)',
            [name, email, hash, 'unverified']
        );

        res.status(201).json({
            message: 'Account created.',
        });
    }
    catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/verify/:token', async (req, res) => {
    try {
        const result = await pool.query(
            "UPDATE users SET status = 'active', verification_token = NULL WHERE verification_token = $1 AND status = 'unverified'",
            [req.params.token]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid or expired verification link' });
        }
        res.json({ message: 'Account verified. You can log in now.' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        const user = rows[0];
        if (!user) return res.status(404).json({ message: 'User not found' });
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(401).json({ message: 'Wrong password' });
        if (user.status === 'blocked') return res.status(403).json({ message: 'User is blocked' });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;