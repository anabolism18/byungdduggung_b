const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 점수 저장
router.post('/scores', async (req, res) => {
  try {
    const { nickname, department, score } = req.body;
    const [result] = await db.execute(
      'INSERT INTO score (nickname, department, score) VALUES (?, ?, ?)',
      [nickname, department, score]
    );
    res.status(201).json({ id: result.insertId, nickname, department, score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 전체 점수 조회 (내림차순)
router.get('/scores', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM score ORDER BY score DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 학과 점수 조회 (내림차순)
router.get('/scores/:department', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM score WHERE department = ? ORDER BY score DESC',
      [req.params.department]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 