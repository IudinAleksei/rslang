import { stat, wordListener } from './wordList';

export function keyboardEvent(event) {
  const list = document.querySelectorAll('.word-list__item');
  const image = document.querySelector('.audiochallenge-image');
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.true-word');
  const speakIcon = document.querySelector('.speak-icon');

  list.forEach((el) => {
    if (el.dataset.key === event.key && el.dataset.word) {
      stat[el.dataset.word] = true;
      stat.right += 1;

      list.forEach((element) => {
        if (element.dataset.word) {
          element.classList.add('right');
        } else {
          element.classList.add('wrong');
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
          element.classList.add('right');
        } else {
          element.classList.add('wrong');
        }
      });
    } else {
      return false;
    }

    image.classList.add('audiochallenge-image_active');
    trueWord.classList.add('true-word_active');
    speakIcon.classList.add('speak-icon_active');

    button.classList.remove('audiochallenge__button');
    button.textContent = '';

    button.classList.add('button-next');

    document.querySelector('.word-list').removeEventListener('click', wordListener);

    return true;
  });
}

export default function keyboardListener() {
  const body = document.querySelector('body');

  body.addEventListener('keydown', keyboardEvent);
}
