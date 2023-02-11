const main = document.querySelector('main');
const startingPlayer = document.getElementById('starting_player_name');
const startButton = document.getElementById('start_game');

const timeRemaining = 60*10;
const addingTime = 10;
let secondsCounting;

// Задаем объекты и массив игроков
const player_1 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_1__timeRemaining'),
  activeTurn: false,
};
const player_2 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_2__timeRemaining'),
  activeTurn: false,
};
const player_3 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_3__timeRemaining'),
  activeTurn: false,
};
const players = [player_1,player_2,player_3];

// Начинаем обратный отсчет времени
const startCountTime = (item) => {
  secondsCounting = setInterval(() => {
    item.timeRemaining--;
    changeShowingTime(item);
  }, 1000);
};

// Отображаем каждую секунду
const changeShowingTime = (item) => {
  const min = Math.trunc(item.timeRemaining / 60) ;
  const sec = item.timeRemaining % 60;
  const timeString = `${min} мин ${sec} сек` 
  item.timer.textContent=timeString;
};

// Начинаем игру: фриз имени, запуск времени для первого игрока
const startGame = () => {
  startingPlayer.disabled = true;
  startButton.disabled = true;
  document.querySelector('.header__label').classList.add('unactive');
  players.forEach( (item) => {
    item.timeRemaining = timeRemaining;
    changeShowingTime(item)
    
  })
  players[2].timeRemaining = players[0].timeRemaining - addingTime;
  players[2].activeTurn = true;
  changeActivePlayer();
}

// Меняем активный таймер
const changeActivePlayer = () => {
  clearInterval(secondsCounting)
  players.forEach((item, index) => {
    if (item.activeTurn) {
      item.timeRemaining = item.timeRemaining + addingTime;
      item.activeTurn = false;
      // players[index + 1].activeTurn = true;
      // startCountTime(players[index + 1])

      if (index + 1 <= players.length - 1) {
        players[index + 1].activeTurn = true
        clearInterval(secondsCounting)
        startCountTime(players[index + 1])
      } else {
        players[0].activeTurn = true
        clearInterval(secondsCounting)
        startCountTime(players[0])
      }

    }
  })
}


startButton.addEventListener('click', startGame)
main.addEventListener('click', changeActivePlayer)

