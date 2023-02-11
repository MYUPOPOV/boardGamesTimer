const timeRemaining = 60*20;
var secondsCounting;


const body = document.querySelector('body')
const timerPlayer_1 = document.querySelector('.player_1__timeRemaing')

timerPlayer_1.textContent=timeRemaining;


const startCountTime = (reducingTime) => {
  secondsCounting = setInterval(() => {
    reducingTime--;
    changeShowingTime(reducingTime);
  }, 1000);
};

const changeShowingTime = (showingTime) => {
  const min = Math.trunc(showingTime / 60) ;
  const sec = showingTime % 60;
  const timeString = `${min} мин ${sec} сек` 
  timerPlayer_1.textContent=timeString;
};


body.addEventListener('click', () => { clearInterval(secondsCounting)})

startCountTime(timeRemaining);

