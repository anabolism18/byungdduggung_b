const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// 라우터 불러오기
const scoreRoutes = require('./routes/scores');

// 라우터 설정
app.use('/scores', scoreRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});