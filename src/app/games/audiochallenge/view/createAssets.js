import { getMedia } from '../../../common/index';

function createSpeakIcon() {
  const div = document.createElement('div');
  div.classList.add('audiochallenge__speak-icon');
  document.querySelector('.audiochallenge__answer__wrapper').prepend(div);
}

function createImage() {
  document.querySelector('.audiochallenge__image__wrapper').innerHTML = '';

  const image = document.createElement('img');
  image.classList.add('audiochallenge-image');

  const srcElem = document.querySelector('[data-image]');
  image.src = getMedia(srcElem.dataset.image);

  document.querySelector('.audiochallenge__image__wrapper').append(image);
}

function createTrueWord() {
  const word = document.querySelector('.audiochallenge__true-word');

  word.textContent = document.querySelector('[data-word]').dataset.word;
}

export { createSpeakIcon, createImage, createTrueWord };
