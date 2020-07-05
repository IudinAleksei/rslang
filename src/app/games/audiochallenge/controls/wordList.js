export const stat = { right: 0, mistakes: 0, dontKnow: 0 };

export function wordListener(event) {
  const audioTranslate = document.querySelector('.word-audio').dataset.translate;
  const button = document.querySelector('.button');
  const trueWord = document.querySelector('.true-word');
  const speakIcon = document.querySelector('.speak-icon');
  const image = document.querySelector('.audiochallenge-image');
  const clickWord = event.target;
  const { word } = clickWord.dataset;
  if (clickWord.textContent === audioTranslate) {
    stat[word] = true;
    stat.right += 1;

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      } else {
        el.classList.add('right');
      }
    });
  } else {
    clickWord.style.textDecoration = 'line-through';

    document.querySelectorAll('.word-list__item').forEach((el) => {
      if (el.textContent !== audioTranslate) {
        el.classList.add('wrong');
      }

      if (el.textContent === audioTranslate) {
        el.classList.add('right');
        stat[el.dataset.word] = false;
        stat.mistakes += 1;
      }
    });
  }

  image.classList.add('audiochallenge-image_active');
  trueWord.classList.add('true-word_active');
  speakIcon.classList.add('speak-icon_active');

  button.classList.remove('audiochallenge__button');
  button.textContent = '';

  button.classList.add('button-next');

  document.querySelector('.word-list').removeEventListener('click', wordListener);
}

export function wordListlistener() {
  document.querySelector('.word-list').addEventListener('click', wordListener);
}
