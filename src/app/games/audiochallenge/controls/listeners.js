/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import createAudio from '../view/createAudio';
import getWordArr from '../view/wordList';
import { createImage, createTrueWord } from '../view/createAssets';

const stat = {};

function repeatAudio() {
  const audio = document.getElementById('word-audio');

  audio.play();
}

async function nextWord() {
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.true-word');
  const speakIcon = document.querySelector('.speak-icon');
  await getWordArr();
  await createAudio();
  wordListlistener();
  createImage();
  createTrueWord();
  trueWord.classList.remove('true-word_active');
  speakIcon.classList.remove('speak-icon_active');
  button.classList.remove('button-next');
  button.classList.add('audiochallenge__button');
  button.textContent = 'I don\'t know';
}

function listener(event) {
  const audioTranslate = document.querySelector('.word-audio').dataset.translate;
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.true-word');
  const speakIcon = document.querySelector('.speak-icon');
  const image = document.querySelector('.audiochallenge-image');
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

  image.classList.add('audiochallenge-image_active');
  trueWord.classList.add('true-word_active');
  speakIcon.classList.add('speak-icon_active');

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
      const trueWord = document.querySelector('.true-word');
      const speakIcon = document.querySelector('.speak-icon');
      const image = document.querySelector('.audiochallenge-image');

      document.querySelectorAll('.word-list__item').forEach((el) => {
        if (el.textContent !== audioTranslate) {
          el.classList.add('wrong');
        }
      });

      image.classList.add('audiochallenge-image_active');
      trueWord.classList.add('true-word_active');
      speakIcon.classList.add('speak-icon_active');

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
