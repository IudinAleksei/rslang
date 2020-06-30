/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import createAudio from '../view/createAudio';
import getWordArr from '../view/wordList';

const stat = {};

function repeatAudio() {
  const audio = document.getElementById('word-audio');

  audio.play();
}

async function nextWord() {
  const button = document.querySelector('.audiochallenge__button');
  await getWordArr();
  await createAudio();
  wordListlistener();
  button.classList.remove('button-next');
}

function listener(event) {
  const audioTranslate = document.querySelector('.word-audio').dataset.translate;
  const button = document.querySelector('.audiochallenge__button');
  const clickWord = event.target;
  const { word } = clickWord.dataset;
  if (clickWord.textContent === audioTranslate) {
    stat[word] = true;

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      }
    });

    button.classList.add('button-next');
  } else {
    clickWord.style.textDecoration = 'line-through';

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      }

      if (el.textContent === audioTranslate) {
        stat[el.dataset.word] = false;
      }
    });
  }
  button.classList.add('button-next');

  document.querySelector('.word-list').removeEventListener('click', listener);
}

function wordListlistener() {
  document.querySelector('.word-list').addEventListener('click', listener);
}

function buttonListener() {
  const button = document.querySelector('.audiochallenge__button');
  button.addEventListener('click', () => {
    if (button.classList.contains('button-next')) {
      document.querySelector('.word-list').innerHTML = '';
      nextWord();
    } else {
      repeatAudio();
    }
  });
}

export { wordListlistener, repeatAudio, buttonListener };
