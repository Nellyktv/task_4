import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export default async function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { rows } = await pool.query(
            'SELECT id, status FROM users WHERE id = $1',
            [decoded.id]
        );
        const user = rows[0];
        if (!user) return res.status(401).json({ message: 'User not found' });
        if (user.status === 'blocked') return res.status(403).json({ message: 'User is blocked' });
        req.userId = user.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
