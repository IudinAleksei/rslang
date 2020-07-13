/* eslint-disable import/no-cycle */
import { stat, wordListener } from './wordList';

export default function keyboardEvent(event) {
  const list = document.querySelectorAll('.audiochallenge__word-list__item');
  const image = document.querySelector('.audiochallenge-image');
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.audiochallenge__true-word');
  const speakIcon = document.querySelector('.audiochallenge__speak-icon');

  list.forEach((el) => {
    if (el.dataset.key === event.key && el.dataset.word) {
      stat[el.dataset.word] = true;
      stat.right += 1;

      list.forEach((element) => {
        if (element.dataset.word) {
          element.classList.add('audiochallenge__right');
        } else {
          element.classList.add('audiochallenge__wrong');
        }
      });
    } else if (el.dataset.key === event.key && !el.dataset.word) {
      const rightWord = document.querySelector('[data-word]');
      stat[rightWord.dataset.word] = false;
      stat.mistakes += 1;

      list.forEach((element) => {
        if (element.dataset.key === event.key) {
          const elem = element;
          elem.style.textDecoration = 'line-through';
        }

        if (element.dataset.word) {
          element.classList.add('audiochallenge__right');
        } else {
          element.classList.add('audiochallenge__wrong');
        }
      });
    } else {
      return false;
    }

    image.classList.add('audiochallenge-image_active');
    trueWord.classList.add('audiochallenge__true-word_active');
    speakIcon.classList.add('audiochallenge__speak-icon_active');

    button.classList.remove('audiochallenge__button');
    button.textContent = '';

    button.classList.add('audiochallenge__button-next');

    document.querySelector('.audiochallenge__word-list').removeEventListener('click', wordListener);

    return true;
  });
}
