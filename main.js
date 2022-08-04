const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    $screen.classList.replace('waiting', 'ready');
    $screen.textContent = '초록색이 되면 클릭해주세요';
    // 파란 화면에서 클릭하고 빨강에서 초록되는 함수가 실행되어야 한다.
    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.replace('ready', 'now');
      $screen.textContent = '클릭하세요!';
      // 첫 시간은 여기서부터 재야한다.
    }, Math.floor((Math.random() + 2) * 1000));
  } else if (event.target.classList.contains('ready')) {
    clearTimeout(timeoutId);
    $screen.classList.replace('ready', 'waiting');
    $screen.innerHTML = '너무 성급하시군요! <br/>다시 시작하세요';
  } else if (event.target.classList.contains('now')) {
    // 끝 시간은 여기서부터 재야한다.
    endTime = new Date();
    // 시간 차이 저장하기
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((acc, cur) => acc + cur, 0) / records.length;
    $result.innerHTML = `현재 : ${current}ms, 평균 : ${Math.floor(
      average
    )}ms, 총 횟수 : ${records.length}번<br/>
    Top 5 : ${records
      .sort((a, b) => a - b)
      .slice(0, 4)
      .join('--')}`;
    // 이전값이 다시 사용될 수 있으니 변수들 초기화(안써도 문제는 없음)
    startTime = null;
    endTime = null;

    $screen.classList.replace('now', 'waiting');
    $screen.textContent = '클릭해서 시작하세요';
  }
});
