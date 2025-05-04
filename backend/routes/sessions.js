const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM Study_Sessions`, []);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { user_id, subject_id, start_time, end_time } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Study_Sessions (user_id, subject_id, start_time, end_time)
             VALUES ($1, $2, $3, $4) RETURNING user_id, subject_id`, 
                [ user_id, subject_id, start_time, end_time ]
        );

        res.status(201).json({
            user: result.rows[0],
            subject_name: result.rows[1]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;