/* eslint-disable no-console */
import { getWords, getWordById } from '../../../common/index';

function random(min, max) {
  Math.ceil(min);
  Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function createWordList() {
  const wordsArr = await getWords(1, random(0, 30));
  const wordListWrapper = document.createElement('div');
  wordListWrapper.classList.add('word-list__wrapper');
  const ul = document.createElement('ul');
  ul.classList.add('words-list');
  const word = wordsArr.map((el) => el);

  for (let i = 0; i < 5; i += 1) {
    const ind = Math.floor(Math.random() * word.length);
    const li = document.createElement('li');
    li.innerText = word[ind].wordTranslate;
    li.setAttribute('data-id', word[ind].id);
    ul.append(li);
    word.splice(ind, 1);
  }

  return document.querySelector('body').append(ul);
}

async function createAudio() {
  const words = document.querySelectorAll('li');
  const wordId = [];

  words.forEach((el) => wordId.push(el.dataset.id));

  const res = await getWordById(wordId[random(0, 6)]);
  console.log(res.audio);
  const audio = document.createElement('audio');
  audio.classList.add('word-audio');
  audio.src = res.audio;
  document.querySelector('body').append(audio);
}

export { createAudio, createWordList };
