/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { createAudio } from '../view/createAudio';
import getWordArr from '../view/wordList';

async function nextWord() {
  await getWordArr();
  await createAudio();
}

export default function wordListlistener() {
  document.querySelector('.word-list').addEventListener('click', (event) => {
    const audioTranslate = document.querySelector('.word-audio').dataset.translate;
    if (event.target.textContent === audioTranslate) {
      document.querySelector('.word-list').innerHTML = '';
      nextWord();
      setTimeout(() => {
        wordListlistener();
      }, 1000);
    } else {
      console.log('try again');
    }
  });
}
