export const stat = { right: 0, mistakes: 0, dontKnow: 0 };

export function wordListener(event) {
  if (!(event.target.classList.contains('audiochallenge__word-list'))) {
    const audioTranslate = document.querySelector('.audiochallenge__word-audio').dataset.translate;
    const button = document.querySelector('.button');
    const trueWord = document.querySelector('.audiochallenge__true-word');
    const speakIcon = document.querySelector('.audiochallenge__speak-icon');
    const image = document.querySelector('.audiochallenge-image');
    const clickWord = event.target;
    const { word } = clickWord.dataset;
    if (clickWord.textContent === audioTranslate) {
      stat[word] = true;
      stat.right += 1;

      document.querySelectorAll('.audiochallenge__word-list__item').forEach((el) => {
        if (el.textContent !== audioTranslate) {
          el.classList.add('audiochallenge__wrong');
        } else {
          el.classList.add('audiochallenge__right');
        }
      });
    } else {
      clickWord.style.textDecoration = 'line-through';

      document.querySelectorAll('.audiochallenge__word-list__item').forEach((el) => {
        if (el.textContent !== audioTranslate) {
          el.classList.add('audiochallenge__wrong');
        }

        if (el.textContent === audioTranslate) {
          el.classList.add('audiochallenge__right');
          stat[el.dataset.word] = false;
          stat.mistakes += 1;
        }
      });
    }

    image.classList.add('audiochallenge-image_active');
    trueWord.classList.add('audiochallenge__true-word_active');
    speakIcon.classList.add('audiochallenge__speak-icon_active');

    button.classList.remove('audiochallenge__button');
    button.textContent = '';

    button.classList.add('audiochallenge__button-next');

    document.querySelector('.audiochallenge__word-list').removeEventListener('click', wordListener);
  }
}

export function wordListlistener() {
  document.querySelector('.audiochallenge__word-list').addEventListener('click', wordListener);
}
