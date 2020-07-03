import createAudio from '../view/createAudio';
import getWordArr from '../view/wordList';
import { createImage, createTrueWord } from '../view/createAssets';
import createStatistic from '../view/statistic';
import { stat, wordListener, wordListlistener } from './wordList';
import statisticButton from './statisticButton';

let round = 1;

export async function nextWord() {
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

function clickButtons() {
  const button = document.querySelector('.button');

  if (button.classList.contains('button-next')) {
    document.querySelector('.word-list').innerHTML = '';

    if (round === 10) {
      round = 1;
      createStatistic(stat);
      statisticButton();

      const arr = Object.keys(stat);
      arr.map((el) => delete stat[el]);

      stat.right = 0;
      stat.mistakes = 0;
      stat.dontKnow = 0;
    } else {
      round += 1;
      nextWord();
    }
  } else {
    document.querySelector('.word-list').removeEventListener('click', wordListener);
    const audioTranslate = document.querySelector('.word-audio').dataset.translate;
    const trueWord = document.querySelector('.true-word');
    const speakIcon = document.querySelector('.speak-icon');
    const image = document.querySelector('.audiochallenge-image');
    const word = trueWord.textContent;

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      } else {
        el.classList.add('right');
      }
    });

    stat.dontKnow += 1;
    stat[word] = 'dontKnow';

    image.classList.add('audiochallenge-image_active');
    trueWord.classList.add('true-word_active');
    speakIcon.classList.add('speak-icon_active');

    button.textContent = '';
    button.classList.remove('audiochallenge__button');
    button.classList.add('button-next');
  }
}

function keybordEnterKey(event) {
  if (event.key === 'Enter') {
    clickButtons();
  }
}

export function buttonListener() {
  const button = document.querySelector('.button');
  const body = document.querySelector('body');
  button.addEventListener('click', clickButtons);
  body.addEventListener('keydown', keybordEnterKey);
}
