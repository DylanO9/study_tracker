const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:user_id', async(req, res) => {
    const { user_id } = req.params;
    console.log('user_id');
    try {
        const result = await pool.query('SELECT * FROM Subjects WHERE user_id = $1', [user_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Subjects not found' });
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM Subjects`, []);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No Subjects table' });
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async(req, res) => {
    const { user_id, subject_name } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO Subjects (user_id, subject_name)
            VALUES ($1, $2) RETURNING user_id, subject_name`,
            [ user_id, subject_name ]
  
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