/* eslint-disable no-unused-vars */
import paintings1 from './view/level1';
import paintings2 from './view/level2';
import paintings3 from './view/level3';
import paintings4 from './view/level4';
import paintings5 from './view/level5';
import paintings6 from './view/level6';
import showGamePage from './view/gamePage';

let page = 0;
let level = 0;
const words = [];
let counterBox = 0;
let counterWord = 0;
let arrayWord = [];
let sorts = [];
let arrayWords = [];
let round = {};
let widthWord = 700;
let heightWord = 400;
let width = 0;

const paintings = [paintings1, paintings2, paintings3, paintings4, paintings5, paintings6];
console.log(paintings);

async function getWords() {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${level}&group=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}
function playAudio(event) {
  const myAudio = new Audio();
  myAudio.src = `https://raw.githubusercontent.com/cup0ra/rslang-data/master/${event}`;
  myAudio.play();
}

async function showPuzzle() {
  counterBox += 1;
  widthWord = 700;
  document.getElementById('check').style.display = 'none';
  round = arrayWords.shift();
  const numberOfLetters = round.textExample.replace(/(<([^>]+)>)/ig, '').match(/[A-Za-z0-9]/g).length;
  const q = round.textExample.replace(/(<([^>]+)>)/ig, '').split(' ');
  document.querySelector('.translate-text').innerHTML = `<button class="play-text"></button><p>${round.textExampleTranslate}</p>`;
  const big = document.createElement('div');
  big.id = `big${counterBox}`;
  big.className = 'box';
  document.querySelector('.block-puzzle').append(big);
  arrayWord = q.map((e, i) => {
    counterWord += 1;
    width = (690 / numberOfLetters) * e.match(/[A-Za-z0-9]/g).length;
    const results = `<span class='puzzle-word' style="width:${width}px; background:url(https://raw.githubusercontent.com/cup0ra/rslang_data_paintings/master/${paintings[level][page].imageSrc});background-position:${widthWord}px ${heightWord}px;background-size:700px 400px" id="${e}${counterWord} " draggable="true"  data-value="${i}">${e}</span>`;
    widthWord -= width;
    return results;
  });

  localStorage.setItem('word', JSON.stringify(round));

  localStorage.setItem('arrayWord', arrayWord);
  sorts = arrayWord;
  document.getElementById('text').innerHTML = sorts.sort(() => Math.random() - 0.5).join('');

  heightWord -= 40;
  playAudio(round.audioExample);
}

export default async function getWord() {
  getWords(page, level).then(async (word) => {
    arrayWords = word;
    console.log(arrayWord);
    await showPuzzle();
  });
}

document.querySelector('body').addEventListener('change', async (event) => {
  if (event.target.id === 'level') {
    level = event.target.value;
    getWord();

    localStorage.setItem('level', level);
  }
  if (event.target.id === 'page') {
    page = event.target.value;

    getWord();

    localStorage.setItem('page', page);
  }
}, false);
