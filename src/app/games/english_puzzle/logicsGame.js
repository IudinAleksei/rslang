import paintings1 from './view/level1';
import paintings2 from './view/level2';
import paintings3 from './view/level3';
import paintings4 from './view/level4';
import paintings5 from './view/level5';
import paintings6 from './view/level6';
import { enableDragSort, drags } from './view/dragAndDrop';
import showGamePage from './view/gamePage';

let counterWord = 0;
let arrayWord = [];
let sorts = [];
let arrayWords = [];
let round = {};

let heightWord = 400;
let width = 0;
let widthPercent = 0;

export const paintings = [paintings1, paintings2, paintings3, paintings4, paintings5, paintings6];

export function playAudio(event) {
  const myAudio = new Audio();
  myAudio.src = `https://raw.githubusercontent.com/cup0ra/rslang-data/master/${event}`;
  myAudio.play();
}

function hindActive() {
  if (localStorage.getItem('puzzleRepeatPlay') === 'true') {
    document.querySelector('.puzzle-game__play-text').classList.remove('puzzle-game__block');
    document.querySelector('.puzzle-game__hint-block__hint1').classList.add('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleRepeatPlay') === 'false') {
    document.querySelector('.puzzle-game__play-text').classList.add('puzzle-game__block');
    document.querySelector('.puzzle-game__hint-block__hint1').classList.remove('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleShowTranslation') === 'true') {
    document.querySelector('.puzzle-game__translate-text p').classList.remove('puzzle-game__block');
    document.querySelector('.puzzle-game__hint-block__hint2').classList.add('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleShowTranslation') === 'false') {
    document.querySelector('.puzzle-game__translate-text p').classList.add('puzzle-game__block');
    document.querySelector('.puzzle-game__hint-block__hint2').classList.remove('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleAutoPlaySound') === 'true') {
    playAudio(round.audioExample);
    document.querySelector('.puzzle-game__hint-block__hint3').classList.add('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleAutoPlaySound') === 'false') {
    document.querySelector('.puzzle-game__hint-block__hint3').classList.remove('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleShowImage') === 'true') {
    document.querySelector('.puzzle-game__hint-block__hint4').classList.add('puzzle-game__active');
  }
  if (localStorage.getItem('puzzleShowImage') === 'false') {
    document.querySelector('.puzzle-game__hint-block__hint4').classList.remove('puzzle-game__active');
    const cols = document.querySelectorAll('.fon');
    [].forEach.call(cols, (col) => {
      col.classList.toggle('puzzle-game__fon-none');
    });
  }
}

async function getWords(levels, pages) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${levels}&page=${pages}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function showPuzzle(level, page) {
  let widthWord = document.querySelector('.puzzle-game__container-puzzle').offsetWidth;
  console.log(widthWord);
  document.getElementById('check').style.display = 'none';
  round = arrayWords.shift();
  const numberOfLetters = round.textExample.replace(/(<([^>]+)>)/ig, '').match(/[A-Za-z0-9]/g).length;
  const q = round.textExample.replace(/(<([^>]+)>)/ig, '').split(' ');
  document.querySelector('.puzzle-game__translate-text').innerHTML = `<button class="puzzle-game__play-text"></button><p>${round.textExampleTranslate}</p>`;
  const big = document.createElement('div');
  big.id = 'box';
  big.className = 'puzzle-game__box';
  big.dataset.id = 'text';
  document.querySelector('.puzzle-game__block-puzzle').append(big);
  arrayWord = q.map((e, i) => {
    counterWord += 1;
    widthPercent = (((document.querySelector('.puzzle-game__container-puzzle').offsetWidth / numberOfLetters) * e.match(/[A-Za-z0-9]/g).length) / document.querySelector('.puzzle-game__container-puzzle').offsetWidth) * 100;
    width = (document.querySelector('.puzzle-game__container-puzzle').offsetWidth / numberOfLetters) * e.match(/[A-Za-z0-9]/g).length;
    console.log(width);
    const results = `<span class='puzzle-game__puzzle-word fon' draggable="true" style="width:${widthPercent}%; background-image:url(https://raw.githubusercontent.com/cup0ra/rslang_data_paintings/master/${paintings[level][page].imageSrc});background-position:${widthWord}px ${heightWord}px;background-size:${document.querySelector('.puzzle-game__container-puzzle').offsetWidth}px 400px" id="${e}${counterWord} " data-value="${i}"><div class="">${e}</div></span>`;
    widthWord -= width;
    return results;
  });
  localStorage.setItem('word', JSON.stringify(round));
  localStorage.setItem('arrayWord', arrayWord);
  sorts = arrayWord;
  document.getElementById('text').innerHTML = sorts.sort(() => Math.random() - 0.5).join('');
  if (arrayWords.length === 0) {
    sessionStorage.setItem('arrayLength', false);
  }
  if (arrayWords.length > 0) {
    sessionStorage.setItem('arrayLength', true);
  }
  console.log(arrayWords);
  heightWord -= 40;
  enableDragSort();
  drags();
  hindActive();
}

export async function getWord(level, page) {
  heightWord = 400;
  getWords(level, page).then(async (word) => {
    console.log(level, page);
    document.querySelector('.main-container').innerHTML = '';
    arrayWords = word;
    await showGamePage(paintings, level);
    await showPuzzle(level, page);
  });
}
