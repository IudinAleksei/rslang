/* eslint-disable no-console */
import { createAudio } from '../view/createAudio';
import getWordArr from '../view/wordList';

export default function listener() {
  const audioTranslate = document.querySelector('audio').dataset.translate;

  document.querySelector('.word-list').addEventListener('click', (event) => {
    if (event.target.textContent === audioTranslate) {
      document.querySelector('.word-list').innerHTML = '';
      createAudio();
      setTimeout(() => {
        getWordArr();
      }, 1000);
      setTimeout(() => {
        listener();
      }, 2000);
    } else {
      console.log('try again');
    }
  });
}
