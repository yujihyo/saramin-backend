fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // 각 행에서 데이터 추출
    const { title, company_name, location, job_description } = row;

    // 쿼리 전에 삽입할 데이터 로그 출력
    console.log('삽입할 데이터:', [title, company_name, location, job_description]);

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
    db.end();
  })
  .on('error', (err) => {
    console.error('CSV 파일 읽기 오류:', err.message);
  });
