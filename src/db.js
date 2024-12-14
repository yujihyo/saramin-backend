const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',    // MySQL 서버 주소
  user: 'root',         // MySQL 사용자명
  password: 'Rgh1226!',  // MySQL 비밀번호
  database: 'saramin_db', // 사용할 데이터베이스 이름
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err.message);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

module.exports = db;
