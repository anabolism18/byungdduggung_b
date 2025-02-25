const express = require('express');
const router = express.Router();
const leaderboardService = require('../services/leaderboardService');

// 점수 저장
router.post('/scores', async (req, res) => {
  try {
    const { nickname, department, similarity } = req.body;
    
    // 데이터 유효성 검사
    if (!nickname || !department || similarity === undefined) {
      return res.status(400).json({ message: '필수 데이터가 누락되었습니다.' });
    }

    const result = await leaderboardService.saveScore({
      nickname,
      department,
      similarity
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 전체 상위 5개 점수 조회
router.get('/scores', async (req, res) => {
  try {
    const topScores = await leaderboardService.getTopScores();
    res.json(topScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 학과 상위 5개 점수 조회
router.get('/scores/:department', async (req, res) => {
  try {
    const topDepartmentScores = await leaderboardService.getTopScoresByDepartment(
      req.params.department
    );
    res.json(topDepartmentScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;