/* eslint-disable no-console */
import { createAudio, createWordList } from '../index';

export default function listener() {
  const audioTranslate = document.querySelector('audio').dataset.translate;

  document.querySelector('.word-list').addEventListener('click', (event) => {
    if (event.target.textContent === audioTranslate) {
      console.log('audioTranslate');
      document.querySelector('.main-container').innerHTML = '';
      createAudio();
      setTimeout(() => {
        createWordList();
      }, 1000);
      setTimeout(() => {
        listener();
      }, 3000);
    } else {
      console.log('try');
    }
  });
}
