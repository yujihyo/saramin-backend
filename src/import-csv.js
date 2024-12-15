const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db'); // 데이터베이스 연결 가져오기

// CSV 파일 경로
const csvFilePath = './random_50_jobs.csv';

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // CSV의 각 행에서 데이터를 추출
    const { title, company_name, location, job_description } = row;

    // MySQL에 데이터 삽입
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
  });
