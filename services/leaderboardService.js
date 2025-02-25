const db = require('../config/db');

class LeaderboardService {
  // 새로운 점수 저장
  async saveScore(scoreData) {
    try {
      const [result] = await db.execute(
        'INSERT INTO score (nickname, department, similarity) VALUES (?, ?, ?)',
        [scoreData.nickname, scoreData.department, scoreData.similarity]
      );

      return { 
        id: result.insertId, 
        ...scoreData 
      };
    } catch (error) {
      throw new Error('점수 저장 중 오류 발생: ' + error.message);
    }
  }

  // 전체 상위 5개 점수 조회
  async getTopScores() {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM score ORDER BY similarity DESC LIMIT 5'
      );
      return rows;  // 자동으로 JSON으로 변환됨
    } catch (error) {
      throw new Error('점수 조회 중 오류 발생: ' + error.message);
    }
  }

  // 특정 학과 상위 5개 점수 조회
  async getTopScoresByDepartment(department) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM score WHERE department = ? ORDER BY similarity DESC LIMIT 5',
        [department]
      );
      return rows;  // 자동으로 JSON으로 변환됨
    } catch (error) {
      throw new Error('학과별 점수 조회 중 오류 발생: ' + error.message);
    }
  }
}

module.exports = new LeaderboardService();