const axios = require('axios');
const cheerio = require('cheerio');

// 사람인 사이트에서 채용 공고 데이터를 크롤링하는 함수
async function crawlJobs() {
  const url = 'https://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=xxxxx'; // 크롤링할 URL로 변경
  const response = await axios.get(url);  // URL에서 데이터 가져오기
  const $ = cheerio.load(response.data);   // HTML 데이터 파싱

  // 예시: 공고 제목 추출
  const jobTitle = $('h1.job_title').text();
  console.log('Job Title:', jobTitle); // 콘솔에 출력

  // 다른 필요한 데이터 추출 (예: 회사명, 지역 등)
  const companyName = $('span.company').text();
  const location = $('div.location').text();
  const jobDescription = $('div.job_description').text();

  console.log('Company Name:', companyName);
  console.log('Location:', location);
  console.log('Job Description:', jobDescription);

  // 이후 MySQL에 데이터를 저장하거나, 파일로 저장할 수 있습니다.
}

// 크롤러 실행
crawlJobs().catch(console.error);
