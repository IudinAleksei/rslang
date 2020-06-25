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
  const word = await getWord();
  const audio = document.createElement('audio');
  audio.classList.add('word-audio');
  audio.src = getMedia(word.audio);
  audio.setAttribute('data-word', word.word);
  audio.setAttribute('data-translate', word.wordTranslate);
  document.querySelector('.audiochallenge-assets').prepend(audio);
  // audio.play();
}

export { getWord, createAudio };
