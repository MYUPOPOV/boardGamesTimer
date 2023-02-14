const main = document.querySelector('main');
const header = document.querySelector('header');

const startButton = document.getElementById('start_game');
const selectTimeRemaining = document.getElementById('select_timeRemaining');
const selectAddingTime = document.getElementById('select_addingTime');
const selectPlayersNumber = document.getElementById('select_playersNumber');
const roundCounter = document.querySelector('.round_counter__counter');
const popup = document.querySelector('.popup');

let addingTime;
let secondsCounting;
let activeIndex;
let counter = 0;
let isGameStarted = false;
let isGamePaused = false;
let isPrevAvatar = false;

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
const player_4 = {
  timeRemaining: 0,
  timer: document.querySelector('.player_4__timeRemaining'),
  card: document.querySelector('.player_4'),
  activeTurn: false,
};
const players = [player_1,player_2,player_3,player_4];

// Начинаем обратный отсчет времени
const startCountTime = (item) => {
  changeShowingTime(item);
  changeColorTime(item);
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

// Сменить активный цвет имени и таймера
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
  item.card.querySelector(".player__image").style.boxShadow = color;
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
  players[activeIndex].card.querySelector(".player__image").classList.add("grayscale");
  if (activeIndex + 1 < players.length) {
    players[activeIndex + 1].activeTurn = true
    startCountTime(players[activeIndex + 1])
    players[activeIndex + 1].card.querySelector(".player__image").classList.remove("grayscale");
    activeIndex++;
    if (!popup.classList.contains('popup-active')) {
      showNitification(`+ ${addingTime} сек`);
    }
  } else {
    players[0].activeTurn = true
    startCountTime(players[0])
    players[0].card.querySelector(".player__image").classList.remove("grayscale");
    activeIndex = 0;
    counter++;
    roundCounter.textContent = counter;
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

// Смена аватара
const changeAvatar = (target) => {
  const currentImageNumber = parseInt(target.dataset.image);
  let imageNumber = (isPrevAvatar) ? currentImageNumber - 1 : currentImageNumber + 1;
  if (imageNumber == 0) {imageNumber = 14};
  if (imageNumber == 15) {imageNumber = 1};
  target.setAttribute("src",`./images/avatars/nobleman_${imageNumber}.png`)
  target.dataset.image = imageNumber;
}

// Рендер карточек
const renderCards = (value) => {
  main.innerHTML='';
  for (let index=0; index < value; index++) {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add(`player`);
    mainDiv.classList.add(`player_${index+1}`);
    
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("player__image");
    img.dataset.image=index+1;
    img.setAttribute("src",`./images/avatars/nobleman_${index+1}.png`)
    imgDiv.append(img)
    mainDiv.append(imgDiv)

    const input = document.createElement("input");
    input.classList.add("player__input");
    input.setAttribute("placeholder",`ИГРОК ${index+1}`);
    mainDiv.append(input)

    const label = document.createElement("label");
    label.classList.add("player__label");
    label.classList.add("hidden");
    label.textContent=`ИГРОК ${index+1}`;
    mainDiv.append(label)

    const timeDiv = document.createElement("div");
    timeDiv.classList.add(`player_${index+1}__timeRemaining`);
    mainDiv.append(timeDiv)

    main.append(mainDiv)
  }
}

// Начинаем игру: фриз полей, запуск времени для первого игрока
const startGame = () => {
  players.length = document.querySelectorAll(".player").length;

  players.forEach((item,index) => {
    item.timer = document.querySelector(`.player_${index+1}__timeRemaining`);
    item.card = document.querySelector(`.player_${index+1}`);
  })
  showNitification('Игра началась');
  startButton.style.opacity = 0.5;
  selectTimeRemaining.disabled = true;
  selectAddingTime.disabled = true;
  selectPlayersNumber.disabled = true;
  startButton.textContent = 'Пауза';
  addingTime = selectAddingTime.value;
  addingTime = ++addingTime - 1;
  players.forEach( (item) => {
    item.timeRemaining = selectTimeRemaining.value*60;
    changeShowingTime(item)
    switchInputToLabel(item)
    item.card.querySelector(".player__image").classList.add("grayscale");
  })
  players[players.length - 1].timeRemaining = players[players.length - 1].timeRemaining - addingTime;
  players[players.length - 1].activeTurn = true;
  changeActivePlayer();
  activeIndex = 0;
  isGameStarted = true
}

// Cлушатели событий
startButton.addEventListener('click', () => {if (!isGameStarted) {startGame()} } )
startButton.addEventListener('dblclick', () => {if (isGameStarted) {togglePause()} } )
selectPlayersNumber.addEventListener('change', () => {renderCards(selectPlayersNumber.value)})

main.addEventListener('click', (event) => {
  if (!isGameStarted) {
    if (event.target.classList.contains("player__image")) {
      setTimeout(() => {if (!isPrevAvatar) {changeAvatar(event.target)}}, 300)
    }
  } 
})

main.addEventListener('dblclick', (event) => {
  if (isGameStarted && !isGamePaused) {
    changeActivePlayer()
  } else if (!isGameStarted) {
    if (event.target.classList.contains("player__image")) {
      isPrevAvatar = true;
      setTimeout(() => {isPrevAvatar = false}, 400);
      changeAvatar(event.target)
    }
  } 
})

document.addEventListener('keydown', (event) => {
  if (event.code="32") {
    changeActivePlayer()
  }
})


