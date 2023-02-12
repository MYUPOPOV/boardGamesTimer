const main = document.querySelector('main');
const header = document.querySelector('header');
const playerNameInputs = document.querySelectorAll('.input');
const startButton = document.getElementById('start_game');
const selectTimeRemaining = document.getElementById('select_timeRemaining');
const selectAddingTime = document.getElementById('select_addingTime');
const popup = document.querySelector('.popup');


let addingTime;
let secondsCounting;
let activeIndex;
let isGameStarted = false;
let isGamePaused = false;

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
      showNitification('Время закончилось');
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

// Сменить цвет имени и таймера
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
      activeIndex = index;
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
    activeIndex++;
    if (!popup.classList.contains('popup-active')) {
      showNitification(`+ ${addingTime} сек`);
    }
  } else {
    players[0].activeTurn = true
    startCountTime(players[0])
    activeIndex = 0;
    if (!popup.classList.contains('popup-active')) {
      showNitification(`+ ${addingTime} сек`);
    }
  }
}

// Меняем имена в input на label
const switchInputToLabel = (item) => {
  const input = item.card.querySelector('.player__input')
  const label = item.card.querySelector('.player__label')
  if (input.value.trim()) {
    label.textContent = input.value.toUpperCase()
  } else {
    label.textContent = input.getAttribute("placeholder")
  }
  input.classList.toggle('hidden')
  label.classList.toggle('hidden')
}

// Переключить паузу игры
const togglePause = () => {
  if (isGamePaused) {
    isGamePaused = !isGamePaused;
    startCountTime(players[activeIndex])
    showNitification('Игра возобновлена');
  } else {
    isGamePaused = !isGamePaused;
    clearInterval(secondsCounting)
    showNitification('Игра остановлена');
  }
}

// Показать оповещение
const showNitification = (message) => {
  popup.classList.add('popup-active')
  popup.querySelector('.popup__message').textContent=message;
  setTimeout(() => {
    popup.classList.remove('popup-active')
  }, 900)
} 

// Начинаем игру: фриз имени, запуск времени для первого игрока
const startGame = () => {
  showNitification('Игра началась');
  playerNameInputs.disabled = true;
  startButton.disabled = true;
  selectTimeRemaining.disabled = true;
  selectAddingTime.disabled = true;
  addingTime = selectAddingTime.value;
  addingTime = ++addingTime - 1;
  players.forEach( (item) => {
    item.timeRemaining = selectTimeRemaining.value*60;
    changeShowingTime(item)
    switchInputToLabel(item)
  })
  players[players.length - 1].timeRemaining = players[players.length - 1].timeRemaining - addingTime;
  players[players.length - 1].activeTurn = true;
  changeActivePlayer();
  activeIndex = 0;
  isGameStarted = true
}

startButton.addEventListener('click', startGame)
main.addEventListener('dblclick', () => {if (isGameStarted && !isGamePaused) {changeActivePlayer()} })
header.addEventListener('dblclick', () => {if (isGameStarted) {togglePause()} } )

