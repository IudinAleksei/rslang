/* eslint-disable no-console */
import {
  getWords, getMedia, getRandomInteger,
} from '../../../common/index';

async function getWord() {
  const wordsArr = await getWords(0, getRandomInteger(0, 29));
  const word = wordsArr[getRandomInteger(0, wordsArr.length - 1)];
  return word;
}

async function createAudio() {
  const audio = document.createElement('audio');
  audio.classList.add('word-audio');
  const srcElem = document.querySelector('[data-audio]');
  audio.src = getMedia(srcElem.dataset.audio);
  audio.setAttribute('data-translate', srcElem.textContent);
  document.querySelector('.audio__wrapper').innerHTML = '';
  document.querySelector('.audio__wrapper').append(audio);
  audio.play();
}

export { getWord, createAudio };
