import { setSessionData } from '../../../common/utils/sessionStorage';
import {
  getWord, playAudio, showPuzzle, paintings,
} from '../logicsGame';
import showStatistic from '../view/statistic';

let wordKnow = [];
let wordNotKnow = [];
let page = localStorage.getItem('puzzlePage') === null ? 0 : localStorage.getItem('puzzlePage');
let level = localStorage.getItem('puzzleLevel') === null ? 0 : localStorage.getItem('puzzleLevel');

function writeStatistic() {
  const time = new Date();
  const roundStatic = [time, level, page, wordKnow.length, wordNotKnow.length];
  console.log(roundStatic);
}

function movingPuzzle(event) {
  if (event.target.closest('.puzzle-game__puzzle-word') || event.target.closest('.puzzle-game__puzzle-word fon') || event.target.closest('.puzzle-game__puzzle-word fon fon-none')) {
    event.target.closest('.puzzle-game__puzzle-word').remove(event.target);
    document.getElementById('box').append(event.target.closest('.puzzle-game__puzzle-word'));
    const len = document.getElementById('text').getElementsByTagName('*');
    if (len.length === 0) {
      document.getElementById('check').style.display = 'block';
    }
  }
}

function controlHint(event) {
  if (event.target.id === 'hint1') {
    document.querySelector('.puzzle-game__play-text').classList.toggle('puzzle-game__block');
    event.target.classList.toggle('puzzle-game__active');
    let repeat;
    if (localStorage.getItem('puzzleRepeatPlay') === 'true') {
      repeat = 'false';
    }
    if (localStorage.getItem('puzzleRepeatPlay') === 'false') {
      repeat = 'true';
    }
    localStorage.setItem('puzzleRepeatPlay', repeat);
  }

  if (event.target.id === 'hint2') {
    document.querySelector('.puzzle-game__translate-text p').classList.toggle('puzzle-game__block');
    event.target.classList.toggle('puzzle-game__active');
    let text;
    if (localStorage.getItem('puzzleShowTranslation') === 'true') {
      text = 'false';
    }
    if (localStorage.getItem('puzzleShowTranslation') === 'false') {
      text = 'true';
    }
    localStorage.setItem('puzzleShowTranslation', text);
  }

  if (event.target.id === 'hint3') {
    event.target.classList.toggle('puzzle-game__active');
    let autoPlay;
    if (localStorage.getItem('puzzleAutoPlaySound') === 'true') {
      autoPlay = 'false';
    }
    if (localStorage.getItem('puzzleAutoPlaySound') === 'false') {
      autoPlay = 'true';
    }
    localStorage.setItem('puzzleAutoPlaySound', autoPlay);
  }

  if (event.target.id === 'hint4') {
    event.target.classList.toggle('puzzle-game__active');
    let showImage;
    if (localStorage.getItem('puzzleShowImage') === 'true') {
      showImage = 'false';
    }
    if (localStorage.getItem('puzzleShowImage') === 'false') {
      showImage = 'true';
    }
    localStorage.setItem('puzzleShowImage', showImage);
    const cols = document.querySelectorAll('.fon');
    [].forEach.call(cols, (col) => {
      col.classList.toggle('puzzle-game__fon-none');
    });
  }
}

function changeLevelPage(event) {
  if (event.target.id === 'level') {
    level = +event.target.value;
    page = 0;
    localStorage.setItem('puzzlePage', page);
    getWord(level, page);
    localStorage.setItem('puzzleLevel', level);
  }
  if (event.target.id === 'page') {
    page = +event.target.value;
    getWord(level, page);
    localStorage.setItem('puzzlePage', page);
  }
}

function controlGamePuzzle(event) {
  let isLENGTH = sessionStorage.getItem('arrayLength') === null ? 'true' : sessionStorage.getItem('arrayLength');
  const round = (JSON.parse(localStorage.getItem('word')));
  if (event.target.className === 'puzzle-game__next') {
    const levelLength = document.getElementById('level').getElementsByTagName('*');
    const pageLength = document.getElementById('page').getElementsByTagName('*');
    page = +page + 1;
    if (page >= pageLength.length) {
      page = 0;
      if (level !== levelLength.length) {
        level = +level + 1;
      }
      if (level === levelLength.length) {
        level = 0;
      }
      localStorage.setItem('puzzleLevel', level);
    }
    document.querySelector('.puzzle-game__block-puzzle').innerHTML = '';
    isLENGTH = true;
    localStorage.setItem('puzzlePage', page);
    getWord(level, page);
    event.target.classList.remove('puzzle-game__next');
    document.getElementById('results').style.display = 'none';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('know').style.display = 'block';
    wordKnow = [];
    wordNotKnow = [];
  }

  if (event.target.className === 'puzzle-game__play-text') {
    playAudio(round.audioExample);
  }
  if (event.target.className === 'puzzle-start-game__button') {
    document.querySelector('.main-container').innerHTML = '';
    document.querySelector('.main-container').classList.remove('puzzle-game__main-container');
    getWord(level, page);
  }
  if (event.target.className === 'button-speech') {
    playAudio(event);
  }
  if (event.target.id === 'continue') {
    const element = document.querySelector('.puzzle-game__container-puzzle').getElementsByClassName('puzzle-game__puzzle-word');
    if (isLENGTH === 'false') {
      for (let i = 0; i < element.length; i += 1) {
        element[i].style.borderColor = 'transparent';
        element[i].innerHTML = '';
      }
      document.querySelector('.puzzle-game__text').innerHTML = `<p class="puzzle-game__name-picture">${paintings[level][page].author} - ${paintings[level][page].name}(${paintings[level][page].year}) </p>`;
      document.getElementById('results').style.display = 'block';
      document.getElementById('continue').style.display = 'block';
      document.getElementById('know').style.display = 'none';
      event.target.classList.add('puzzle-game__next');
      writeStatistic();
    }
    if (isLENGTH === 'true') {
      document.getElementById('box').removeAttribute('id');
      for (let i = 0; i < element.length; i += 1) {
        element[i].style.borderColor = 'black';
      }
      showPuzzle(level, page);

      document.getElementById('know').style.display = 'block';
      document.getElementById('continue').style.display = 'none';
    }
  }
  if (event.target.id === 'results') {
    showStatistic(paintings, level, page, wordKnow, wordNotKnow);
  }
  if (event.target.id === 'know') {
    document.getElementById('text').innerHTML = '';
    document.getElementById('box').innerHTML = (localStorage.getItem('arrayWord')).split(',').join('');
    document.getElementById('box').setAttribute('draggable', 'false');
    const elements = document.getElementById('box').getElementsByClassName('puzzle-game__puzzle-word');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].setAttribute('draggable', 'false');
      elements[i].classList.remove('fon');
      elements[i].classList.add('done');
      elements[i].style.borderColor = 'green';
    }
    document.getElementById('continue').style.display = 'block';
    document.getElementById('know').style.display = 'none';
    document.getElementById('check').style.display = 'none';
    playAudio(round.audioExample);
    wordNotKnow.push(JSON.parse(localStorage.getItem('word')));
  }
  if (event.target.id === 'check') {
    const element = document.getElementById('box').getElementsByClassName('puzzle-game__puzzle-word');
    let counter = 0;
    for (let i = 0; i < element.length; i += 1) {
      if (+element[i].dataset.value === i) {
        element[i].style.borderColor = 'green';
        counter += 1;
      } else {
        element[i].style.borderColor = 'red';
      }
    }
    if (counter === element.length) {
      wordKnow.push(JSON.parse(localStorage.getItem('word')));
      document.getElementById('box').setAttribute('draggable', 'false');
      for (let i = 0; i < element.length; i += 1) {
        element[i].setAttribute('draggable', 'false');
        element[i].classList.remove('fon');
        element[i].classList.remove('puzzle-game__fon-none');
        element[i].classList.add('done');
        element[i].style.borderColor = 'green';
      }
      if (isLENGTH === 'true') {
        document.getElementById('know').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('continue').style.display = 'block';
        playAudio(round.audioExample);
      } if (isLENGTH === 'false') {
        document.getElementById('continue').style.display = 'block';
        document.getElementById('know').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('check').style.display = 'none';
        setSessionData({ puzzleCounterBox: 0 });
        const elements = document.querySelector('.puzzle-game__container-puzzle').getElementsByClassName('puzzle-game__puzzle-word');
        for (let i = 0; i < elements.length; i += 1) {
          elements[i].style.borderColor = 'transparent';
          elements[i].innerHTML = '';
        }
        document.querySelector('.puzzle-game__text').innerHTML = `<p class="puzzle-game__name-picture">${paintings[level][page].author} - ${paintings[level][page].name}(${paintings[level][page].year}) </p>`;
      }
    }
  }
  if (event.target.id === 'button-statistic') {
    const levelLength = document.getElementById('level').getElementsByTagName('*');
    const pageLength = document.getElementById('page').getElementsByTagName('*');
    page = +page + 1;
    if (page >= pageLength.length) {
      page = 0;
      if (level !== levelLength.length) {
        level = +level + 1;
      }
      if (level === levelLength.length) {
        level = 0;
      }
      localStorage.setItem('puzzleLevel', level);
    }
    isLENGTH = true;
    wordNotKnow = [];
    wordKnow = [];
    document.querySelector('.main-container').innerHTML = '';
    localStorage.setItem('puzzlePage', page);
    getWord(level, page);
  }
  if (event.target.className === 'puzzle-game__word-statistic-button') {
    playAudio(event.target.dataset.value);
  }
}

export default function puzzleGameHandling() {
  document.querySelector('.menu__items__item').addEventListener('click', () => {
    document.querySelector('body').classList.remove('puzzle-game__background');
  });
  document.querySelector('.main-container').addEventListener('click', (event) => {
    controlHint(event);
    controlGamePuzzle(event);
    movingPuzzle(event);
  });
  document.querySelector('.main-container').addEventListener('change', async (event) => {
    changeLevelPage(event);
  }, false);
}
