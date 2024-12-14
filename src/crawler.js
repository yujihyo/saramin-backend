const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');  // DB 연결 코드

// 사람인 채용 공고 목록 페이지 URL
const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category';

async function crawlData() {
  try {
    const response = await axios.get(url);  // URL에서 HTML 데이터 가져오기
    const $ = cheerio.load(response.data);  // HTML 파싱

    console.log("크롤링 시작: ", url);

    // 채용 공고 목록에서 데이터 추출 (예: 제목, 회사명, 위치)
    $('div.job_list ul li').each((index, element) => {
      const jobTitle = $(element).find('a').text().trim();  // 채용 공고 제목
      const companyName = $(element).find('.company').text().trim();  // 회사명
      const location = $(element).find('.location').text().trim();  // 위치

      console.log('Job Title:', jobTitle);  // 크롤링된 제목 출력
      console.log('Company Name:', companyName);  // 크롤링된 회사명 출력
      console.log('Location:', location);  // 크롤링된 위치 출력

      // 데이터베이스에 저장
      const query = 'INSERT INTO jobs (title, company_name, location) VALUES (?, ?, ?)';
      db.query(query, [jobTitle, companyName, location], (err, result) => {
        if (err) {
          console.error('데이터베이스에 저장 실패:', err.message);
          return;
        }
        console.log('채용 공고 데이터가 DB에 저장되었습니다.');
        console.log('Insert Result:', result); // 삽입 결과 출력
      });
    });
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error.message);
  }
}

// 크롤링 함수 실행
crawlData();
