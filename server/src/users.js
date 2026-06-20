import { Router } from 'express';
import pool from './config/db.js';
import authMiddleware from './middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, name, email, status, last_login FROM users ORDER BY last_login DESC NULLS LAST'
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/unverified', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE status = 'unverified'"
        );
        res.json({ message: `Deleted ${result.rowCount} unverified users` });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;

        if (status === 'blocked') {
            await pool.query(
                "UPDATE users SET previous_status = status, status = 'blocked' WHERE id = $1 AND status != 'blocked'",
                [id]
            );
            return res.json({ message: 'User blocked' });
        }

        if (status === 'active') {
            await pool.query(
                "UPDATE users SET status = COALESCE(previous_status, 'active'), previous_status = NULL WHERE id = $1 AND status = 'blocked'",
                [id]
            );
            return res.json({ message: 'User unblocked' });
        }

        return res.status(400).json({ message: 'Invalid status' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/verify', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            "UPDATE users SET status = 'active', verification_token = NULL WHERE id = $1 AND status = 'unverified'",
            [req.params.id]
        );
        res.json({ message: 'User verified' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;