/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import createAudio from '../view/createAudio';
import getWordArr from '../view/wordList';
import { createImage } from '../view/createAssets';

const stat = {};

function repeatAudio() {
  const audio = document.getElementById('word-audio');

  audio.play();
}

async function nextWord() {
  const button = document.querySelector('.button');
  await getWordArr();
  await createAudio();
  wordListlistener();
  createImage();
  button.classList.remove('button-next');
  button.classList.add('audiochallenge__button');
  button.textContent = 'I don\'t know';
}

function listener(event) {
  const audioTranslate = document.querySelector('.word-audio').dataset.translate;
  const button = document.querySelector('.button');
  const clickWord = event.target;
  const { word } = clickWord.dataset;
  if (clickWord.textContent === audioTranslate) {
    stat[word] = true;

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      }
    });
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
  button.classList.remove('audiochallenge__button');
  button.textContent = '';

  button.classList.add('button-next');

  document.querySelector('.word-list').removeEventListener('click', listener);
}

function wordListlistener() {
  document.querySelector('.word-list').addEventListener('click', listener);
}

function buttonListener() {
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    if (button.classList.contains('button-next')) {
      document.querySelector('.word-list').innerHTML = '';
      nextWord();
    } else {
      const audioTranslate = document.querySelector('.word-audio').dataset.translate;
      document.querySelectorAll('.word-list__item').forEach((el) => {
        if (el.textContent !== audioTranslate) {
          el.classList.add('wrong');
        }
      });

      button.textContent = '';
      button.classList.remove('audiochallenge__button');
      button.classList.add('button-next');
    }
  });
}

function audioIconListener() {
  const icon = document.querySelector('.speak-icon');

  icon.addEventListener('click', repeatAudio);
}

export {
  wordListlistener, repeatAudio, buttonListener, audioIconListener,
};
