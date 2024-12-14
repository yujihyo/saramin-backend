const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');  // DB 연결 코드

// 크롤링할 사람인 채용 공고 페이지 URL
const url = 'https://www.saramin.co.kr/zf_user/jobs/list/domestic'; // 실제 URL로 변경

async function crawlData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // 데이터 추출 (예: 공고 제목, 회사명 등)
    const jobTitle = $('h1.job_title').text();
    const companyName = $('span.company').text();
    const location = $('div.location').text();
    const jobDescription = $('div.job_description').text();

    // 추출한 데이터 콘솔에 출력
    console.log('Job Title:', jobTitle);
    console.log('Company Name:', companyName);
    console.log('Location:', location);
    console.log('Job Description:', jobDescription);

    // 데이터베이스에 저장
    const query = 'INSERT INTO jobs (title, company_name, location, job_description) VALUES (?, ?, ?, ?)';
    db.query(query, [jobTitle, companyName, location, jobDescription], (err, result) => {
      if (err) {
        console.error('데이터베이스에 저장 실패:', err.message);
        return;
      }
      console.log('채용 공고 데이터가 DB에 저장되었습니다.');
    });
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error.message);
  }
}

// 크롤링 함수 실행
crawlData();
