const main = document.querySelector('main');
const startingPlayer = document.getElementById('starting_player_name');
const startButton = document.getElementById('start_game');
const selectTimeRemaining = document.getElementById('select_timeRemaining');
const selectAddingTime = document.getElementById('select_addingTime');

let addingTime;
let secondsCounting;
let activeIndex;

// Задаем объекты и массив игроков
const player_1 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_1__timeRemaining'),
  card: document.querySelector('.player_1'),
  activeTurn: false,
};
const player_2 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_2__timeRemaining'),
  card: document.querySelector('.player_2'),
  activeTurn: false,
};
const player_3 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_3__timeRemaining'),
  card: document.querySelector('.player_3'),
  activeTurn: false,
};
const players = [player_1,player_2,player_3];

// Начинаем обратный отсчет времени
const startCountTime = (item) => {
  secondsCounting = setInterval(() => {
    if (item.timeRemaining <= 1) {
      clearInterval(secondsCounting)
    }
    item.timeRemaining--;
    changeShowingTime(item);
    changeColorTime(item);
  }, 1000);
};

// Отображаем каждую секунду
const changeShowingTime = (item) => {
  const min = Math.trunc(item.timeRemaining / 60) ;
  const sec = item.timeRemaining % 60;
  const timeString = `${min} мин ${sec} сек` 
  item.timer.textContent=timeString;
};

const changeColorTime = (item) => {
  let color;
  if (item.timeRemaining >= 600) {
    color = 'green'
  } else if (item.timeRemaining >= 300 && item.timeRemaining < 600) {
    color = 'blue'
  } else if (item.timeRemaining >= 60 && item.timeRemaining < 300) {
    color = 'orange'
  } else if (item.timeRemaining >= 0 && item.timeRemaining < 600) {
    color = 'red'
  }
  item.card.style.color = color;
  item.card.classList.add('bold');;
};

// Меняем активный таймер
const changeActivePlayer = () => {
  clearInterval(secondsCounting)
  players.forEach((item, index) => {
    if (item.activeTurn) {
      activeIndex = index
    }
  });
  players[activeIndex].timeRemaining = players[activeIndex].timeRemaining + addingTime;
  changeShowingTime(players[activeIndex]);
  players[activeIndex].activeTurn = false;
  players[activeIndex].card.style.color = 'black';
  players[activeIndex].card.classList.remove('bold');
  if (activeIndex + 1 < players.length) {
    players[activeIndex + 1].activeTurn = true
    startCountTime(players[activeIndex + 1])
  } else {
    players[0].activeTurn = true
    startCountTime(players[0])
  }
}

// Начинаем игру: фриз имени, запуск времени для первого игрока
const startGame = () => {
  startingPlayer.disabled = true;
  startButton.disabled = true;
  selectTimeRemaining.disabled = true;
  selectAddingTime.disabled = true;
  addingTime = ++selectAddingTime.value;

  document.querySelector('.header__label').classList.add('unactive');
  players.forEach( (item) => {
    item.timeRemaining = selectTimeRemaining.value*60;
    changeShowingTime(item)
    
  })
  players[2].timeRemaining = players[0].timeRemaining - addingTime;
  players[2].activeTurn = true;
  changeActivePlayer();
}

startButton.addEventListener('click', startGame)
main.addEventListener('dblclick', changeActivePlayer)

