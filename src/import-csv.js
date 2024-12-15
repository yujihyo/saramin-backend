const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db'); // db.js에서 연결된 MySQL 연결 가져오기

// CSV 파일 경로
const csvFilePath = './random_50_jobs.csv';  // CSV 파일 경로 확인

// CSV 파일 읽기 및 데이터 삽입
fs.createReadStream(csvFilePath)
  .pipe(csv())  // CSV 파일을 읽고 파싱
  .on('data', (row) => {
    // 각 행에서 데이터 추출
    const { title, company_name, location, job_description } = row;

    // MySQL 쿼리
    const query = 'INSERT INTO jobs (title, company_name, location, job_description) VALUES (?, ?, ?, ?)';
    db.query(query, [title, company_name, location, job_description], (err, result) => {
      if (err) {
        console.error('데이터 삽입 오류:', err.message);
      } else {
        console.log('데이터 삽입 성공:', result.insertId);
      }
    });
  })
  .on('end', () => {
    console.log('CSV 데이터 삽입 완료');
    db.end(); // 데이터베이스 연결 종료
  })
  .on('error', (err) => {
    console.error('CSV 파일 읽기 오류:', err.message);
  });
