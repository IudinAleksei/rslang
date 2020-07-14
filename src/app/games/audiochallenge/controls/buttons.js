/* eslint-disable import/no-cycle */
import createAudio from '../view/createAudio';
import { getWordArr } from '../view/wordList';
import { createImage, createTrueWord } from '../view/createAssets';
import createStatistic from '../view/statistic';
import { stat, wordListener, wordListlistener } from './wordList';
import statisticButton from './statisticButton';
import keyboardEvent from './keyboard';
import renderAudiochallengeStartPage from '../view/startPage';

let round = 1;
let bodyPosition = 0;

export async function nextWord() {
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.audiochallenge__true-word');
  const speakIcon = document.querySelector('.audiochallenge__speak-icon');

  await getWordArr();
  await createAudio();
  wordListlistener();
  createImage();
  createTrueWord();

  trueWord.classList.remove('audiochallenge__true-word_active');
  speakIcon.classList.remove('audiochallenge__speak-icon_active');
  button.classList.remove('audiochallenge__button-next');
  button.classList.add('audiochallenge__button');
  button.textContent = 'I don\'t know';
}

function clickButtons() {
  const button = document.querySelector('.button');
  const bodyBcg = document.querySelector('.audiochallenge__body');

  if (button.classList.contains('audiochallenge__button-next')) {
    document.querySelector('.audiochallenge__word-list').innerHTML = '';

    if (round === 10) {
      round = 1;
      createStatistic(stat);
      statisticButton();

      const arr = Object.keys(stat);
      arr.map((el) => delete stat[el]);

      stat.right = 0;
      stat.mistakes = 0;
      stat.dontKnow = 0;

      const body = document.querySelector('body');

      body.removeEventListener('keydown', keyboardEvent);
    } else {
      round += 1;
      nextWord();
    }

    if (bodyPosition === 90) {
      bodyPosition = 0;
    } else {
      bodyPosition += 10;
    }

    bodyBcg.style.backgroundPosition = `${bodyPosition}% ${bodyPosition}%`;
  } else if (button.classList.contains('audiochallenge__button')) {
    document.querySelector('.audiochallenge__word-list').removeEventListener('click', wordListener);
    const audioTranslate = document.querySelector('.audiochallenge__word-audio').dataset.translate;
    const trueWord = document.querySelector('.audiochallenge__true-word');
    const speakIcon = document.querySelector('.audiochallenge__speak-icon');
    const image = document.querySelector('.audiochallenge-image');
    const word = trueWord.textContent;

    document.querySelectorAll('.audiochallenge__word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('audiochallenge__wrong');
      } else {
        el.classList.add('audiochallenge__right');
      }
    });

    stat.dontKnow += 1;
    stat[word] = 'dontKnow';

    image.classList.add('audiochallenge-image_active');
    trueWord.classList.add('audiochallenge__true-word_active');
    speakIcon.classList.add('audiochallenge__speak-icon_active');

    button.textContent = '';
    button.classList.remove('audiochallenge__button');
    button.classList.add('audiochallenge__button-next');
  }
}

export function keyboardEnterKey(event) {
  if (event.key === 'Enter' && document.querySelector('.audiochallenge__button-again')) {
    renderAudiochallengeStartPage();
  } else if (document.querySelector('.audiochallenge__start-button')) {
    return false;
  } else if (event.code === 'Enter') {
    clickButtons();
  }

  return true;
}

export function buttonListener() {
  const button = document.querySelector('.button');
  const body = document.querySelector('body');
  button.addEventListener('click', clickButtons);
  body.addEventListener('keydown', keyboardEnterKey);
}
