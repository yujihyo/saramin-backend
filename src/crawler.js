const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');  // DB 연결 코드

const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category';

async function crawlData() {
  try {
    console.log('크롤링 시작: ', url);

    // axios 요청 시작
    const response = await axios.get(url);
    console.log('응답 받음, 상태 코드:', response.status);

    if (response.status !== 200) {
      console.log('문제가 발생했습니다. 상태 코드:', response.status);
      return;
    }

    const $ = cheerio.load(response.data);  // HTML 파싱
    console.log('HTML 파싱 완료');

    // 데이터 추출
    $('div.job_list ul li').each((index, element) => {
      const jobTitle = $(element).find('a').text().trim();
      const companyName = $(element).find('.company').text().trim();
      const location = $(element).find('.location').text().trim();

      console.log('Job Title:', jobTitle);
      console.log('Company Name:', companyName);
      console.log('Location:', location);

      // 데이터베이스에 저장
      const query = 'INSERT INTO jobs (title, company_name, location) VALUES (?, ?, ?)';
      db.query(query, [jobTitle, companyName, location], (err, result) => {
        if (err) {
          console.error('데이터베이스에 저장 실패:', err.message);
          return;
        }
        console.log('채용 공고 데이터가 DB에 저장되었습니다.');
      });
    });
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error.message);
  }
}

crawlData();
