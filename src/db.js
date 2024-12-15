const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rgh1226!', // 실제 MySQL 비밀번호
  database: 'saramin_db'      // 사용할 데이터베이스 이름
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err.message);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다.');
});

module.exports = db;
