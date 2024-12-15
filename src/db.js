const mysql = require('mysql2');

// 데이터베이스 연결 생성
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rgh1226!', // 실제 MySQL 비밀번호
  database: 'saramin_db',    // 사용할 데이터베이스 이름
});

module.exports = db;
